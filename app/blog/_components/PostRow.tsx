'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TransitionLink } from '@/app/components/Pagetransition'
import { BlogPost, formatDate } from '../../lib/data';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as any },
  },
};

export default function PostRow({ post, index }: { post: BlogPost; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="initial"
      animate={isInView ? 'open' : 'initial'}
      transition={{ delay: index * 0.06 }}
    >
      <TransitionLink href={`/blog/${post.slug}`} className="no-underline block">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="border-t border-neutral-200 py-7 md:py-9 cursor-pointer"
        >
          {/* ── Mobile: stacked ── */}
          <div className="md:hidden flex flex-col gap-1.5">
            <h2
              className="m-0 font-normal text-neutral-900 leading-snug transition-all duration-300"
              style={{ fontSize: 'clamp(1.1rem, 5vw, 1.5rem)' }}
            >
              {post.title}
            </h2>
            <p className="m-0 font-light text-neutral-400" style={{ fontSize: 'var(--text-xs)' }}>
              {post.tags[0]} · {formatDate(post.date)} · {post.readTime} min
            </p>
          </div>

          {/* ── Desktop: 4-col grid matching ListHeaders ── */}
          <div
            className="hidden md:grid"
            style={{ gridTemplateColumns: '2fr 0.8fr 0.8fr 0.5fr' }}
          >
            <h2
              className="m-0 font-normal text-neutral-900 leading-snug pr-8 transition-all duration-300"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                transform: hovered ? 'translateX(8px)' : 'translateX(0)',
              }}
            >
              {post.title}
            </h2>

            <p
              className="m-0 self-center font-light text-neutral-400 transition-opacity duration-300"
              style={{
                fontSize: 'var(--text-sm)',
                opacity: hovered ? 1 : 0.65,
              }}
            >
              {post.tags[0]}
            </p>

            <p
              className="m-0 self-center font-light text-neutral-400 transition-opacity duration-300"
              style={{
                fontSize: 'var(--text-sm)',
                opacity: hovered ? 1 : 0.65,
              }}
            >
              {formatDate(post.date)}
            </p>

            <p
              className="m-0 self-center font-light text-neutral-400 text-right transition-opacity duration-300"
              style={{
                fontSize: 'var(--text-sm)',
                opacity: hovered ? 1 : 0.65,
              }}
            >
              {post.readTime} min
            </p>
          </div>
        </div>
      </TransitionLink>
    </motion.div>
  );
}