'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '../../../lib/data';
import RoundedButton from '@/app/components/RoundedButton'; // adjust path to match your project

export default function PostBody({ post }: { post: BlogPost }) {
  const dividerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: dividerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax on the "x" line — matches the snippet you shared
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
          {/* Lead paragraph */}
          <p
            className="text-neutral-700 font-light leading-[1.85]"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
          >
            {post.excerpt}
          </p>

          <div className="my-10 h-px bg-neutral-100" />

          {/* ── Author bio ── */}
          <div className="mt-16 pt-10 border-t border-neutral-100 flex items-center gap-5">
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

      {/* ── Divider + Read on Hashnode CTA ── */}
      <div
        ref={dividerRef}
        className="relative flex items-center justify-end mt-[clamp(64px,10vh,120px)]"
      >
        {/* Horizontal rule */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-200" />

        {/* Magnetic rounded button */}
        <motion.div style={{ x }} className="relative z-10">
          <a
            href={post.externalUrl}
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
                Read on<br />Hashnode
              </p>
            </RoundedButton>
          </a>
        </motion.div>
      </div>

      {/* ── Back to blog ── */}
      <div className="max-w-[680px] mx-auto mt-16 pt-10 border-t border-neutral-100">
        <Link
          href="/blog"
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
          Back to all posts
        </Link>
      </div>
    </div>
  );
}