'use client';
import { useRef } from 'react';
import { useInView, motion, Variants } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';

const fadeUp: Variants = {
  initial: { opacity: 0, y: 32 },
  open: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] as any },
  }),
};

const services = [
  {
    number: '01',
    title: 'Full Stack Development',
    icon: null,
    description:
      'I engineer production-ready applications with a strong focus on performance, maintainability, and clean architecture — built to handle real-world scale.',
  },
  {
    number: '02',
    title: 'Developer Systems',
    icon: null,
    description:
      'I design and build developer-centric systems with a focus on usability, efficiency, and seamless integrations that improve overall product capabilities.',
  },
  {
    number: '03',
    title: 'Product Engineering',
    icon: '✦',
    description:
      'I approach every build with a product mindset — turning ideas into scalable digital products with strong foundations, polished experiences, and long-term vision.',
  },
];

export default function Services() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const isInView    = useInView(headingRef,  { once: false, margin: '0px 0px -15% 0px' });
  const cardsInView = useInView(sectionRef,  { once: true,  margin: '0px 0px -10% 0px' });

  return (
    <div className="py-20 md:py-28 lg:py-36">
      <div className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40">

        <div ref={headingRef} className="mb-12 md:mb-16 lg:mb-20">
          <AnimatedHeading
            text="I can help you with"
            isInView={isInView}
            className="text-neutral-900"
          />
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.number}
              variants={fadeUp}
              custom={i}
              initial="initial"
              animate={cardsInView ? 'open' : 'initial'}
              className="flex flex-col gap-6"
            >
              <div>
                <p className="m-0 text-neutral-400 font-light mb-4" style={{ fontSize: 'var(--text-xs)' }}>
                  {s.number}
                </p>
                <div className="w-full h-px bg-neutral-300" />
              </div>

              <h2
                className="m-0 font-normal text-neutral-900 flex items-center gap-2"
                style={{ fontSize: 'var(--text-display-sm)' }}
              >
                {s.icon && (
                  <span className="text-neutral-900" style={{ fontSize: '0.7em', lineHeight: 1 }}>
                    {s.icon}
                  </span>
                )}
                {s.title}
              </h2>

              <p
                className="m-0 font-light text-neutral-600 leading-relaxed"
                style={{ fontSize: 'var(--text-base)' }}
              >
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}