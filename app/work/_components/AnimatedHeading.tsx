'use client';
import { motion, Variants } from 'framer-motion';

const slideUp: Variants = {
  initial: { y: '100%' },
  open: (i: number) => ({
    y: '0%',
    transition: { duration: 0.6, delay: 0.015 * i, ease: [0.76, 0, 0.24, 1] as any },
  }),
  closed: { y: '100%', transition: { duration: 0.5 } },
};

interface Props {
  text: string; // use \n for line breaks
  isInView: boolean;
}

export default function AnimatedHeading({ text, isInView }: Props) {
  let globalIndex = 0;

  return (
    <h1
      className="m-0 font-normal leading-[1.05] tracking-[-0.02em]"
      style={{ fontSize: 'clamp(2.8rem, 7vw, 7.5rem)' }}
    >
      {text.split('\n').map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word) => {
            const i = globalIndex++;
            return (
              <span key={i} className="relative inline-flex overflow-hidden mr-[0.25em]">
                <motion.span
                  variants={slideUp}
                  custom={i}
                  animate={isInView ? 'open' : 'closed'}
                  initial="initial"
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}