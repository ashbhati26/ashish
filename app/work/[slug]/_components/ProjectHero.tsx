'use client';
import { useRef } from 'react';
import { useScroll, useTransform, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/app/lib/data';

const slideUp = {
  initial: { y: '100%' },
  open: (i: number) => ({
    y: '0%',
    transition: { duration: 0.6, delay: 0.015 * i, ease: [0.76, 0, 0.24, 1] as any },
  }),
  closed: { y: '100%', transition: { duration: 0.5 } },
};

export default function ProjectHero({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(headingRef, { once: true, margin: '0px 0px -10% 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  let gi = 0;

  return (
    <div ref={sectionRef}>
      {/* ── Meta + title ── */}
      <div className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40 pt-[clamp(100px,16vh,200px)] pb-[clamp(40px,6vh,80px)]">

        {/* Category tags + year */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          {project.category.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-neutral-100 text-neutral-500 font-light rounded-full"
              style={{ fontSize: 'var(--text-xs)' }}
            >
              {cat}
            </span>
          ))}
          <span className="text-neutral-400 font-light" style={{ fontSize: 'var(--text-sm)' }}>
            {project.location} · {project.year}
          </span>
        </motion.div>

        {/* Animated title */}
        <h1
          ref={headingRef}
          className="m-0 font-normal leading-[1.08] tracking-[-0.02em] text-neutral-900"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)', maxWidth: '14em' }}
        >
          {project.title.split(' ').map((word) => {
            const i = gi++;
            return (
              <span key={i} className="relative inline-flex overflow-hidden mr-[0.22em]">
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
        </h1>

        {/* Services */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="m-0 mt-6 font-light text-neutral-500"
          style={{ fontSize: 'var(--text-base)' }}
        >
          {project.services}
        </motion.p>
      </div>

      {/* ── Parallax cover image ── */}
      <div
        className="relative overflow-hidden w-full"
        style={{ height: 'clamp(300px, 55vw, 680px)' }}
      >
        <motion.div
          style={{ top: '-12%', bottom: '-12%', left: 0, right: 0, y: imageY, position: 'absolute' }}
          className="will-change-transform"
        >
          {/* Fallback color shown behind the image */}
          <div className="absolute inset-0" style={{ backgroundColor: project.color }} />
          <Image
            src={project.image}
            fill
            alt={project.title}
            className="object-cover"
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}