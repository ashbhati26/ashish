'use client';
import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as any } },
  closed: { opacity: 0, y: 24 },
};

export default function ListHeaders({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate={isInView ? 'open' : 'closed'}
      transition={{ delay: 0.45 }}
      className="hidden md:grid pb-4 border-b border-neutral-200"
      style={{ gridTemplateColumns: '2fr 1fr 1.4fr 0.6fr' }}
    >
      {(['Client', 'Location', 'Services', 'Year'] as const).map((col) => (
        <p
          key={col}
          className="m-0 uppercase tracking-[0.18em] text-neutral-400"
          style={{ fontSize: '11px', textAlign: col === 'Year' ? 'right' : 'left' }}
        >
          {col}
        </p>
      ))}
    </motion.div>
  );
}