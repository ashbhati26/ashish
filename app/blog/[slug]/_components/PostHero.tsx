"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import Image from "next/image";
import { BlogPost, formatDate } from "../../../lib/data";

const slideUp = {
  initial: { y: "100%" },
  open: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.6,
      delay: 0.015 * i,
      ease: [0.76, 0, 0.24, 1] as any,
    },
  }),
  closed: { y: "100%", transition: { duration: 0.5 } },
};

export default function PostHero({ post }: { post: BlogPost }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  let gi = 0;

  return (
    <div ref={sectionRef}>
      {/* ── Meta + title ── */}
      <div className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40 pt-[clamp(100px,16vh,200px)] pb-[clamp(40px,6vh,80px)]">
        {/* Tags + date + read time */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-neutral-100 text-neutral-500 font-light rounded-full"
              style={{ fontSize: "var(--text-xs)" }}
            >
              {tag}
            </span>
          ))}
          <span
            className="text-neutral-400 font-light"
            style={{ fontSize: "var(--text-sm)" }}
          >
            {formatDate(post.date)} · {post.readTime} min read
          </span>
        </motion.div>

        {/* Animated title */}
        <h1
          ref={headingRef}
          className="m-0 font-normal leading-[1.08] tracking-[-0.02em] text-neutral-900"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)", maxWidth: "14em" }}
        >
          {post.title.split(" ").map((word) => {
            const i = gi++;
            return (
              <span
                key={i}
                className="relative inline-flex overflow-hidden mr-[0.22em]"
              >
                <motion.span
                  variants={slideUp}
                  custom={i}
                  animate={isInView ? "open" : "closed"}
                  initial="initial"
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </h1>
      </div>

      {/* ── Parallax cover image ── */}
      <div
        className="relative overflow-hidden w-full"
        style={{ height: "clamp(300px, 55vw, 680px)" }}
      >
        <motion.div
          className="absolute inset-x-0 will-change-transform"
          // oversized so parallax never reveals edges
          style={
            { top: "-12%", bottom: "-12%", left: 0, right: 0, y: imageY } as any
          }
        >
          {/* Fallback gradient shown behind the image */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #1c1d21 0%, #2d2e34 100%)",
            }}
          />
          <Image
            src={post.coverImage}
            fill
            alt={post.title}
            className="object-cover"
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
