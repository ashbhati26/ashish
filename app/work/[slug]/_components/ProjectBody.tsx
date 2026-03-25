'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/app/lib/data';
import RoundedButton from '@/app/components/RoundedButton';

export default function ProjectBody({ project }: { project: Project }) {
  const dividerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: dividerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax on CTA button — mirrors PostBody
  const x = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40 py-[clamp(60px,10vh,120px)]">

      {/* ── Centred article column ── */}
      <div className="max-w-[680px] mx-auto">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Lead / excerpt */}
          <p
            className="text-neutral-700 font-light leading-[1.85]"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
          >
            {project.excerpt}
          </p>

          <div className="my-10 h-px bg-neutral-100" />

          {/* Tech stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-col gap-4">
              <p
                className="m-0 uppercase tracking-[0.18em] text-neutral-400 font-light"
                style={{ fontSize: 'var(--text-xs)' }}
              >
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-neutral-100 text-neutral-600 font-light rounded-full"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="my-10 h-px bg-neutral-100" />

          {/* Project meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-1.5">
              <p className="m-0 uppercase tracking-[0.18em] text-neutral-400 font-light" style={{ fontSize: 'var(--text-xs)' }}>
                Services
              </p>
              <p className="m-0 text-neutral-700 font-light" style={{ fontSize: 'var(--text-sm)' }}>
                {project.services}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="m-0 uppercase tracking-[0.18em] text-neutral-400 font-light" style={{ fontSize: 'var(--text-xs)' }}>
                Year
              </p>
              <p className="m-0 text-neutral-700 font-light" style={{ fontSize: 'var(--text-sm)' }}>
                {project.year}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="m-0 uppercase tracking-[0.18em] text-neutral-400 font-light" style={{ fontSize: 'var(--text-xs)' }}>
                Location
              </p>
              <p className="m-0 text-neutral-700 font-light" style={{ fontSize: 'var(--text-sm)' }}>
                {project.location}
              </p>
            </div>
          </div>

          <div className="my-10 h-px bg-neutral-100" />

          {/* Author bio */}
          <div className="flex items-center gap-5">
            <span
              className="relative rounded-full overflow-hidden flex-shrink-0"
              style={{ width: 56, height: 56 }}
            >
              <Image
                fill
                alt="Ashish Bhati"
                src="/me-icon.png"
                className="object-cover"
              />
            </span>
            <div className="flex flex-col gap-1">
              <p
                className="m-0 font-normal text-neutral-900"
                style={{ fontSize: 'var(--text-base)' }}
              >
                Ashish Bhati
              </p>
              <p
                className="m-0 font-light text-neutral-400"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Freelance Designer &amp; Developer · India
              </p>
            </div>
          </div>
        </motion.article>
      </div>

      {/* ── Divider + Live site CTA (only if liveUrl exists) ── */}
      {project.liveUrl && (
        <div
          ref={dividerRef}
          className="relative flex items-center justify-end mt-[clamp(64px,10vh,120px)]"
        >
          <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-200" />

          <motion.div style={{ x }} className="relative z-10">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <RoundedButton
                className="rounded-full border border-(--color-border) flex items-center justify-center mr-16 sm:mr-20"
                style={{
                  width: 'clamp(100px, 12vw, 180px)',
                  height: 'clamp(100px, 12vw, 180px)',
                }}
              >
                <p
                  className="m-0 z-10 relative text-center leading-snug"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  Live<br />Site ↗
                </p>
              </RoundedButton>
            </a>
          </motion.div>
        </div>
      )}

      {/* ── Back to work ── */}
      <div className="max-w-[680px] mx-auto mt-16 pt-10 border-t border-neutral-100">
        <Link
          href="/work"
          className="inline-flex items-center gap-3 text-neutral-500 hover:text-neutral-900 transition-colors font-light no-underline"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13 8H3M3 8L7 4M3 8L7 12"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to all work
        </Link>
      </div>
    </div>
  );
}