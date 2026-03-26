'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Copyright } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';
import { navItems, socials } from '../lib/data';
import { TransitionLink } from '@/app/components/Pagetransition'

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Pages with a white/light background — navbar text should be dark
const LIGHT_BG_ROUTES = ['/work', '/about', '/blog'];

const menuSlide: Variants = {
  initial: { x: 'calc(100% + 100px)' },
  enter:   { x: '0',                  transition: { duration: 0.8, ease: EASE } },
  exit:    { x: 'calc(100% + 100px)', transition: { duration: 0.8, ease: EASE } },
};

const slide: Variants = {
  initial: { x: 80 },
  enter: (i: number) => ({ x: 0,  transition: { duration: 0.8, ease: EASE, delay: 0.05 * i } }),
  exit:  (i: number) => ({ x: 80, transition: { duration: 0.8, ease: EASE, delay: 0.05 * i } }),
};

const scaleVar: Variants = {
  open:   { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } },
};

function NavbarBrand({ isDark }: { isDark: boolean }) {
  return (
    <TransitionLink href="/" className="no-underline">
      <div className="group flex items-center cursor-pointer">
        <div
          className="transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]"
          style={{ color: isDark ? '#1c1d21' : 'white' }}
        >
          <Copyright size={16} strokeWidth={1.5} />
        </div>
        <div
          className="relative ms-2 flex overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out group-hover:pe-8"
          style={{ color: isDark ? '#1c1d21' : 'white' }}
        >
          <span className="text-xs font-light opacity-60 transition-transform duration-500 ease-in-out group-hover:-translate-x-full">
            Code by
          </span>
          <span className="ps-1 text-xs font-semibold tracking-wide transition-transform duration-500 ease-in-out group-hover:-translate-x-[50px]">
            Ashish
          </span>
          <span className="absolute left-[88px] ps-1 text-xs font-semibold tracking-wide transition-transform duration-500 ease-in-out group-hover:-translate-x-[50px]">
            Bhati
          </span>
        </div>
      </div>
    </TransitionLink>
  );
}

function NavCurve() {
  const h = window.innerHeight;
  const curve: Variants = {
    initial: { d: `M100 0 L100 ${h} Q-100 ${h / 2} 100 0` },
    enter:   { d: `M100 0 L100 ${h} Q100  ${h / 2} 100 0`, transition: { duration: 1,   ease: EASE } },
    exit:    { d: `M100 0 L100 ${h} Q-100 ${h / 2} 100 0`, transition: { duration: 0.8, ease: EASE } },
  };
  return (
    <svg
      className="absolute top-0 fill-[var(--dark)]"
      style={{ left: -99, width: 100, height: '100%', stroke: 'none' }}
    >
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
    </svg>
  );
}

function NavPanel() {
  const pathname = usePathname();
  const [selected, setSelected] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed right-0 top-0 h-screen w-full sm:w-[70vw] md:w-[55vw] md:max-w-[700px] md:min-w-[500px] z-[100] flex flex-col justify-between bg-[var(--dark)]"
    >
      <div className="flex flex-col justify-between h-full px-8 sm:px-14 md:px-20 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div onMouseLeave={() => setSelected(pathname)}>
          <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.3em] mb-8">
            Navigation
          </p>
          <div className="w-full h-px bg-white/10 mb-10" />

          <div className="flex flex-col">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                className="relative flex items-center"
                onMouseEnter={() => setSelected(item.href)}
                custom={i}
                variants={slide}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <motion.div
                  variants={scaleVar}
                  animate={selected === item.href ? 'open' : 'closed'}
                  className="absolute rounded-full bg-white"
                  style={{ width: 10, height: 10, left: -30 }}
                />
                <TransitionLink
                  href={item.href}
                  className="!text-white text-[clamp(44px,10vw,80px)] leading-[1.1] font-light no-underline tracking-[-0.03em] hover:opacity-40 transition-opacity duration-300"
                >
                  {item.title}
                </TransitionLink>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.3em]">
            Socials
          </p>
          <div className="flex flex-wrap gap-6 sm:gap-8">
            {socials.map(({ label, href }) => (
              <Magnetic key={label}>
                <TransitionLink
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!text-white font-light cursor-pointer hover:opacity-50 transition-opacity duration-200"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  {label}
                </TransitionLink>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>

      <NavCurve />
    </motion.div>
  );
}

export function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const burger   = useRef<HTMLDivElement>(null);
  const navbar   = useRef<HTMLElement>(null);

  // Determine if the current route has a light background
  const isLightRoute = LIGHT_BG_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  useEffect(() => { if (isActive) setIsActive(false); }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const TRIGGER_END = window.innerHeight * 0.2;
    const isDesktop   = window.matchMedia('(min-width: 1024px)').matches;

    if (!isDesktop) {
      gsap.set(burger.current, { scale: 1 });
      gsap.set(navbar.current, { y: -100, opacity: 0 });
      return;
    }

    // FIX 2: Always reset navbar to visible on every page load/navigation.
    // Without this, GSAP state from a previous page's scroll persists,
    // causing the navbar to appear hidden until the user scrolls back to top.
    gsap.set(navbar.current, { y: 0, opacity: 1 });
    gsap.set(burger.current, { scale: 0 });

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: TRIGGER_END,
      onLeave: () => {
        gsap.to(navbar.current, { y: -100, opacity: 0, duration: 0.4, ease: 'power2.in' });
        gsap.to(burger.current, { scale: 1,            duration: 0.25, ease: 'power1.out' });
      },
      onEnterBack: () => {
        gsap.to(navbar.current, { y: 0,   opacity: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(burger.current, { scale: 0,            duration: 0.25, ease: 'power1.out' });
        setIsActive(false);
      },
    });

    // Clean up ScrollTrigger instances on unmount / route change
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [pathname]); // re-run on route change so GSAP state is always fresh

  return (
    <>
      <nav
        ref={navbar}
        className="fixed inset-x-0 top-0 z-[50] flex items-center justify-between px-6 sm:px-10 md:px-14 py-6 sm:py-8 md:py-10"
        style={{ color: isLightRoute ? '#1c1d21' : 'white' }}
      >
        <NavbarBrand isDark={isLightRoute} />
        <ul className="flex items-center max-lg:hidden">
          {navItems.map(({ href, title }) => (
            <li key={href}>
              <Magnetic>
                <div className="flex flex-col items-center gap-1.5 cursor-pointer group px-5 py-2">
                  <TransitionLink
                    href={href}
                    className="font-light tracking-wide no-underline opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: isLightRoute ? '#1c1d21' : 'white',
                    }}
                  >
                    {title}
                  </TransitionLink>
                  <span
                    className="block w-1 h-1 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200"
                    style={{ backgroundColor: isLightRoute ? '#1c1d21' : 'white' }}
                  />
                </div>
              </Magnetic>
            </li>
          ))}
        </ul>
      </nav>

      {/* FIX 1: Floating burger + brand together.
          Brand always uses white text since it sits against the dark burger background.
          Both elements share the same ref so they animate in/out together via GSAP. */}
      <div
        ref={burger}
        className="fixed z-[101] scale-0 top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-3"
      >
        {/* Brand — matches current page background just like the top navbar */}
        <NavbarBrand isDark={isLightRoute} />

        <Magnetic>
          <div
            onClick={() => setIsActive(v => !v)}
            className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300"
            style={{ backgroundColor: isActive ? 'var(--brand)' : 'var(--dark)' }}
          >
            <div className="relative w-5 h-[12px]">
              <span
                className={`absolute left-0 w-full h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
                  isActive ? 'top-[5px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-[5px] w-full h-[1.5px] bg-white transition-all duration-300 ${
                  isActive ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
                  isActive ? 'top-[5px] -rotate-45' : 'top-[10px]'
                }`}
              />
            </div>
          </div>
        </Magnetic>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <NavPanel />}
      </AnimatePresence>
    </>
  );
}