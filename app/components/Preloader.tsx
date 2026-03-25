'use client';
import { useEffect, useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

const words = ['Hello', 'Bonjour', 'Ciao', 'Olà', 'やあ', 'Hallå', 'Guten tag', 'Hallo', 'नमस्ते'];

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const BULGE = 120;

const opacity: Variants = {
  initial: { opacity: 0 },
  enter:   { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
};

export default function Preloader() {
  const [index, setIndex]           = useState(0);
  const [dimension, setDimension]   = useState({ width: 1440, height: 900 }); // ← non-zero SSR fallback
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted]   = useState(false); // ← track hydration

  useEffect(() => {
    setIsMounted(true);
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (index === words.length - 1) {
      setTimeout(() => setIsComplete(true), 500);
      return;
    }
    setTimeout(() => setIndex(i => i + 1), index === 0 ? 1000 : 150);
  }, [index, isMounted]);

  const { width: w, height: h } = dimension;

  const slideUp: Variants = {
    initial: { top: 0 },
    exit: {
      top: -(h + BULGE),
      transition: { duration: 0.9, ease: EASE, delay: 0.1 },
    },
  };

  const domeCurve: Variants = {
    initial: { d: `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} Z` },
    exit: {
      d: `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + BULGE} 0 ${h} Z`,
      transition: { duration: 0.6, ease: EASE, delay: 0.1 },
    },
  };

  return (
    <>
      {/* 
        Instant SSR cover — visible before JS hydrates, no flash possible.
        Once the animated preloader mounts and covers the screen, this is hidden.
      */}
      {!isComplete && (
        <div
          className="fixed inset-0 z-[98] bg-[var(--dark)]"
          style={{ pointerEvents: 'none' }}
        />
      )}

      <AnimatePresence mode="wait">
        {!isComplete && (
          <motion.div
            key="preloader"
            variants={slideUp}
            initial="initial"
            exit="exit"
            style={{ height: h }}
            className="fixed inset-0 z-[99] flex items-center justify-center bg-[var(--dark)] overflow-visible"
          >
            <motion.p
              variants={opacity}
              initial="initial"
              animate="enter"
              className="absolute z-10 flex items-center gap-3 text-white font-light tracking-[-0.02em]"
              style={{ fontSize: 'var(--text-preloader)' }}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-white shrink-0" />
              {words[index]}
            </motion.p>

            <svg
              className="absolute top-0 left-0 w-full pointer-events-none overflow-visible"
              style={{ height: h + BULGE }}
            >
              <motion.path
                variants={domeCurve}
                initial="initial"
                exit="exit"
                fill="var(--dark)"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}