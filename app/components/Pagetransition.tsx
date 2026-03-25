'use client';
import {
  useEffect, useState, useRef, useCallback,
  createContext, useContext,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, Variants } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   Context
───────────────────────────────────────────────────────── */
interface TransitionCtx { navigate: (href: string) => void; }
const Ctx = createContext<TransitionCtx>({ navigate: () => {} });
export const useTransition = () => useContext(Ctx);

/* ─────────────────────────────────────────────────────────
   Route labels
───────────────────────────────────────────────────────── */
const ROUTE_LABELS: Record<string, string> = {
  '/':        'Hello',
  '/work':    'Work',
  '/about':   'About',
  '/blog':    'Blog',
  '/contact': 'Contact',
};
function getLabel(path: string): string {
  if (ROUTE_LABELS[path]) return ROUTE_LABELS[path];
  const segment = '/' + path.split('/')[1];
  return ROUTE_LABELS[segment] ?? '...';
}

/* ─────────────────────────────────────────────────────────
   Timing
───────────────────────────────────────────────────────── */
const CURTAIN_IN_MS  = 550;
const CURTAIN_OUT_MS = 1400;
const SAFETY_MS      = 2200;

/* ─────────────────────────────────────────────────────────
   Curtain variants
───────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const W = 100, H = 100, B = 15;
const PATH_INITIAL = `M0,0 Q${W / 2},${-B} ${W},0 L${W},${H + B} L0,${H + B} Z`;
const PATH_FLAT    = `M0,0 Q${W / 2},0     ${W},0 L${W},${H}     L0,${H}     Z`;
const PATH_EXIT    = `M0,0 Q${W / 2},0     ${W},0 L${W},${H}     Q${W / 2},${H + B} 0,${H} Z`;

const pathVariants: Variants = {
  initial: { d: PATH_INITIAL },
  enter:   { d: PATH_FLAT, transition: { duration: 0.45, ease: EASE } },
  exit:    { d: PATH_EXIT, transition: { duration: 0.55, ease: EASE } },
};
const wrapperVariants: Variants = {
  initial: { y: '102vh' },
  enter:   { y: '0vh',    transition: { duration: 0.55, ease: EASE } },
  exit:    { y: '-102vh', transition: { duration: 0.75, ease: EASE } },
};
const wordVariants: Variants = {
  initial: { opacity: 0 },
  enter:   { opacity: 0.9, transition: { duration: 0.25, delay: 0.3 } },
  exit:    { opacity: 0,   transition: { duration: 0.15 } },
};

function Curtain({ word }: { word: string }) {
  return (
    <motion.div
      variants={wrapperVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed inset-0 z-[200] overflow-visible"
      style={{ pointerEvents: 'all' }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        <motion.path
          variants={pathVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          fill="var(--dark)"
        />
      </svg>
      <motion.p
        variants={wordVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="absolute inset-0 flex items-center justify-center gap-3 text-white font-light tracking-[-0.02em] select-none z-10 m-0"
        style={{ fontSize: 'var(--text-preloader)' }}
      >
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-white shrink-0" />
        {word}
      </motion.p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Provider
───────────────────────────────────────────────────────── */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  const [curtainVisible, setCurtainVisible] = useState(false);
  const [word, setWord]                     = useState('Hello');

  // This cover is a plain black div — always rendered in the DOM.
  // It's visible (opacity 1, pointer-events all) while a back/forward
  // navigation is in progress, blocking any flash of the new page.
  // It turns invisible (opacity 0, pointer-events none) only after
  // the animated curtain has fully covered the screen.
  const [coverVisible, setCoverVisible] = useState(false);

  const timers         = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isProgrammatic = useRef(false); // true = we triggered nav via TransitionLink
  const prevPathname   = useRef(pathname);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  /* ── pathname change = back/forward OR programmatic push completing ── */
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    if (isProgrammatic.current) {
  // 🚀 DO NOT re-trigger curtain
  isProgrammatic.current = false;

  clearTimers();

  // Only handle exit, not enter again
  timers.current.push(setTimeout(() => {
    setCurtainVisible(false);
  }, CURTAIN_OUT_MS));

  timers.current.push(setTimeout(() => {
    setCurtainVisible(false);
  }, SAFETY_MS));

  return;
}

    // ── Back / Forward navigation ──────────────────────────────────────
    // Next.js has ALREADY rendered the new page by now (useEffect is
    // post-paint). The cover div is what prevents the flash — it goes
    // visible instantly via popstate (see below), BEFORE the paint.
    // Here we just mount the animated curtain on top of the cover,
    // then hide both together.
    clearTimers();
    setWord(getLabel(pathname));
    setCurtainVisible(true);

    // Once the animated curtain is fully up, we can drop the cover
    timers.current.push(setTimeout(() => setCoverVisible(false), CURTAIN_IN_MS));

    // Hide curtain after it's done its job
    timers.current.push(setTimeout(() => setCurtainVisible(false), CURTAIN_OUT_MS));
    timers.current.push(setTimeout(() => setCurtainVisible(false), SAFETY_MS));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* ── popstate: fires synchronously before paint on back/forward ──────
   * This is the ONLY place we can block the flash — right here,
   * before the browser repaints with the new page content.
   * We make the cover div visible instantly (no animation needed —
   * it's just a black screen), so the user never sees the page swap.
   * The animated curtain then mounts on top of it in the next effect.
   * ──────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const onPopState = () => {
      // Don't intercept if we triggered the nav ourselves
      if (isProgrammatic.current) return;
      setCoverVisible(true);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  /* ── TransitionLink: forward navigation ── */
  const navigate = useCallback((href: string) => {
    if (isProgrammatic.current) return;
    clearTimers();

    isProgrammatic.current = true;
    setWord(getLabel(href));
    setCurtainVisible(true);

    // Navigate only after curtain has covered the screen
    timers.current.push(setTimeout(() => {
      router.push(href);
    }, CURTAIN_IN_MS));

    // Safety fallback
    timers.current.push(setTimeout(() => {
      setCurtainVisible(false);
      isProgrammatic.current = false;
    }, SAFETY_MS));
  }, [router, clearTimers]);

  return (
    <Ctx.Provider value={{ navigate }}>
      {/* 
        Instant cover — no animation, just a plain dark div.
        Visible during back/forward to block flash before
        the animated curtain has time to mount.
      */}
      {coverVisible && (
        <div
          className="fixed inset-0 bg-[var(--dark)]"
          style={{ zIndex: 199, pointerEvents: 'all' }}
        />
      )}

      {children}

      <AnimatePresence mode="wait">
        {curtainVisible && <Curtain word={word} />}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

/* ─────────────────────────────────────────────────────────
   TransitionLink
───────────────────────────────────────────────────────── */
interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}
export function TransitionLink({
  href, children, className, style, target, rel,
}: TransitionLinkProps) {
  const { navigate } = useTransition();
  const isExternal = href.startsWith('http') || href.startsWith('#') || target === '_blank';

  if (isExternal) {
    return (
      <a href={href} className={className} style={style} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}