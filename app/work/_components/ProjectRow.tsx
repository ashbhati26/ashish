'use client';
import { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { TransitionLink } from '../../components/Pagetransition';
import { Project } from '../../lib/data';

const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as any } },
  closed: { opacity: 0, y: 24 },
};

interface Props {
  project: Project;
  index: number;
  /** Called when mouse enters — pass clientX/Y so parent can drive GSAP modal */
  onHoverEnter?: (x: number, y: number) => void;
  onHoverLeave?: (x: number, y: number) => void;
}

export default function ProjectRow({ project, index, onHoverEnter, onHoverLeave }: Props) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="initial"
      animate={isInView ? 'open' : 'closed'}
      transition={{ delay: index * 0.06 }}
    >
      <TransitionLink href={project.href} className="no-underline block">
        <div
          onMouseEnter={(e) => { setHovered(true);  onHoverEnter?.(e.clientX, e.clientY); }}
          onMouseLeave={(e) => { setHovered(false); onHoverLeave?.(e.clientX, e.clientY); }}
          className="py-6 md:py-9 border-t border-neutral-200 cursor-pointer"
        >
          {/* mobile: stacked */}
          <div className="md:hidden flex flex-col gap-1.5">
            <h2
              className="m-0 font-normal text-neutral-900 transition-all duration-300"
              style={{ fontSize: 'clamp(1.4rem, 6vw, 2rem)' }}
            >
              {project.title}
            </h2>
            <p className="m-0 font-light text-neutral-400" style={{ fontSize: '13px' }}>
              {project.services} — {project.year}
            </p>
          </div>

          {/* desktop: 4-col grid */}
          <div
            className="hidden md:grid"
            style={{ gridTemplateColumns: '2fr 1fr 1.4fr 0.6fr' }}
          >
            <h2
              className="m-0 font-normal text-neutral-900 transition-all duration-300"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
                transform: hovered ? 'translateX(8px)' : 'translateX(0)',
              }}
            >
              {project.title}
            </h2>
            <p
              className="m-0 self-center font-light text-neutral-500 transition-opacity duration-300"
              style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', opacity: hovered ? 1 : 0.65 }}
            >
              {project.location}
            </p>
            <p
              className="m-0 self-center font-light text-neutral-500 transition-opacity duration-300"
              style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', opacity: hovered ? 1 : 0.65 }}
            >
              {project.services}
            </p>
            <p
              className="m-0 self-center font-light text-neutral-500 text-right transition-opacity duration-300"
              style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', opacity: hovered ? 1 : 0.65 }}
            >
              {project.year}
            </p>
          </div>
        </div>
      </TransitionLink>
    </motion.div>
  );
}