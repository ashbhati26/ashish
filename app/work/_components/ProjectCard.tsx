'use client';
import { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../../lib/data';

const fadeUp: Variants = {
  initial: { opacity: 0, y: 40 },
  open: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as any } },
  closed: { opacity: 0, y: 40 },
};

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="initial"
      animate={isInView ? 'open' : 'closed'}
      transition={{ delay: (index % 2) * 0.12 }}
    >
      <Link href={project.href} className="no-underline block group">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image container — matches reference: slightly inset card on bg */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              // 16:10 aspect ratio like the reference screenshots
              paddingBottom: '62.5%',
              backgroundColor: '#f0eeeb',
              borderRadius: '4px',
            }}
          >
            <div
              className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
            >
              <Image
                src={project.image}
                fill
                alt={project.title}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                  // Fallback: show colored placeholder if image missing
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Color fallback shown behind the image */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: project.color, opacity: 0.85 }}
              />
            </div>
          </div>

          {/* Card meta below image — matches reference layout */}
          <div className="mt-5">
            {/* Title */}
            <h2
              className="m-0 font-normal text-neutral-900 transition-all duration-300 mb-3"
              style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              }}
            >
              {project.title}
            </h2>

            {/* Thin divider */}
            <div className="w-full h-px bg-neutral-200 mb-3" />

            {/* Services + Year in one row */}
            <div className="flex items-center justify-between">
              <p className="m-0 font-light text-neutral-500" style={{ fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)' }}>
                {project.services}
              </p>
              <p className="m-0 font-light text-neutral-500" style={{ fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)' }}>
                {project.year}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}