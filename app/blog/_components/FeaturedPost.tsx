"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { TransitionLink } from '@/app/components/Pagetransition'
import { BlogPost, formatDate } from "../../lib/data";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as any },
  },
};

export default function FeaturedPost({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="initial"
      animate={isInView ? "open" : "initial"}
    >
      <TransitionLink href={`/blog/${post.slug}`} className="no-underline block group">
        
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center border-t border-neutral-200 py-10 md:py-14"
        >
          
          {/* ── Left: content ── */}
          <div className="flex flex-col gap-5 w-full lg:w-1/2">
            
            {/* Meta */}
            <div className="flex items-center gap-4">
              <span
                className="px-3 py-1 rounded-full border border-neutral-300 text-neutral-500 font-light"
                style={{
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.1em",
                }}
              >
                Featured
              </span>

              <span
                className="text-neutral-400 font-light"
                style={{ fontSize: "var(--text-xs)" }}
              >
                {formatDate(post.date)} · {post.readTime} min read
              </span>
            </div>

            {/* Title */}
            <h2
              className="m-0 font-normal text-neutral-900 leading-tight transition-all duration-300"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                transform: hovered
                  ? "translateX(6px)"
                  : "translateX(0)",
              }}
            >
              {post.title}
            </h2>

            {/* Excerpt */}
            <p
              className="m-0 font-light text-neutral-500 leading-relaxed"
              style={{ fontSize: "var(--text-base)" }}
            >
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-neutral-100 text-neutral-500 font-light rounded-full"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: image ── */}
          <div
            className="relative overflow-hidden rounded-sm w-full lg:w-1/2"
            style={{
              paddingBottom: "60%",
              backgroundColor: "#f0eeeb",
            }}
          >
            <div
              className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
            >
              <Image
                src={post.coverImage}
                fill
                alt={post.title}
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />

              <div className="absolute inset-0 bg-neutral-200 opacity-30" />
            </div>
          </div>

        </div>
      </TransitionLink>
    </motion.div>
  );
}