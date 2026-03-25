'use client';
import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import RoundedButton from '../../components/RoundedButton';

const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as any },
  },
};

interface Props {
  onSubmit: () => void;
  submitting: boolean;
}

export default function SendButton({ onSubmit, submitting }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="initial"
      animate={isInView ? 'open' : 'initial'}
      transition={{ delay: 0.1 }}
    >

      {/* Button centred ON the divider line */}
      <div className="relative flex items-center justify-center" style={{ marginTop: -1 }}>
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/10 pointer-events-none" />

        <div className="relative z-10 my-8">
          <RoundedButton
            onClick={onSubmit}
            className="border border-(--color-border-dark) rounded-full flex items-center justify-center cursor-pointer"
            style={{
              width: 'clamp(120px, 14vw, 190px)',
              height: 'clamp(120px, 14vw, 190px)',
            }}
          >
            <p
              className="m-0 z-10 relative text-center font-light"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {submitting ? 'Sending…' : 'Send it!'}
            </p>
          </RoundedButton>
        </div>
      </div>
    </motion.div>
  );
}