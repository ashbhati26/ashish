'use client';
import { useState, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as any },
  },
};

interface Props {
  number: string;
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  multiline?: boolean;
  index: number;
  value: string;
  onChange: (val: string) => void;
}

export default function FormField({
  number,
  label,
  placeholder,
  name,
  type = 'text',
  multiline = false,
  index,
  value,
  onChange,
}: Props) {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  const sharedInputClass = `
  w-full bg-transparent border-none outline-none ring-0 shadow-none appearance-none
  font-light text-white/40
  placeholder:text-white/20 focus:text-white/80
  transition-colors duration-300
  resize-none caret-white
`;

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="initial"
      animate={isInView ? 'open' : 'initial'}
      transition={{ delay: index * 0.07 }}
    >
      {/* Top divider — brightens on focus */}
      <div
        className="w-full h-px mb-6 transition-colors duration-300"
        style={{ backgroundColor: focused ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)' }}
      />

      {/* Row: step number + label + input */}
      <div
        className="flex gap-8 md:gap-12"
        style={{ minHeight: multiline ? 180 : 'auto' }}
      >
        {/* Step number */}
        <span
          className="text-white/25 font-light flex-shrink-0 mt-1 select-none"
          style={{ fontSize: 'var(--text-xs)', minWidth: 32 }}
        >
          {number}
        </span>

        {/* Label + input stacked */}
        <div className="flex-1 flex flex-col gap-4">
          <label
            htmlFor={name}
            className="text-white font-light cursor-pointer leading-tight"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
          >
            {label}
          </label>

          {multiline ? (
            <textarea
              id={name}
              name={name}
              placeholder={placeholder}
              rows={5}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={sharedInputClass}
              style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={sharedInputClass}
              style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
            />
          )}
        </div>
      </div>

      <div className="mb-6" />
    </motion.div>
  );
}