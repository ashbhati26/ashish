"use client";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import AnimatedHeading from "./_components/AnimatedHeading";
import FeaturedPost from "./_components/FeaturedPost";
import PostRow from "./_components/PostRow";
import { posts } from "../lib/data";
import Contact from "../sections/Contact";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as any },
  },
};

export default function BlogPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, {
    once: false,
    margin: "0px 0px -20% 0px",
  });

  const featured = posts.find((p) => p.featured)!;
  const rest = posts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40">
        {/* ── Heading ── */}
        <div
          ref={headingRef}
          className="pt-[clamp(100px,16vh,200px)] pb-[clamp(32px,5vh,64px)]"
        >
          <AnimatedHeading
            text={"Thoughts, ideas\n& tutorials"}
            isInView={isInView}
            className="text-neutral-900"
          />
        </div>

        {/* ── Subtitle ── */}
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate={isInView ? "open" : "initial"}
          transition={{ delay: 0.4 }}
          className="m-0 font-light text-neutral-400 mb-[clamp(40px,7vh,80px)]"
          style={{ fontSize: "var(--text-base)", maxWidth: 540 }}
        >
          Writing about frontend development, animation, open-source projects,
          and the craft of building things for the web.
        </motion.p>

        {/* ── Featured post ── */}
        <FeaturedPost post={featured} />

        {/* ── Column headers (NO animation) ── */}
        <div
          className="hidden md:grid pb-4 mt-12 border-b border-neutral-200"
          style={{ gridTemplateColumns: "2fr 0.8fr 0.8fr 0.5fr" }}
        >
          {(
            [
              ["Title", "left"],
              ["Topic", "left"],
              ["Date", "left"],
              ["Read", "right"],
            ] as const
          ).map(([col, align]) => (
            <p
              key={col}
              className="m-0 uppercase tracking-[0.18em] text-neutral-400"
              style={{
                fontSize: "var(--text-xs)",
                textAlign: align,
              }}
            >
              {col}
            </p>
          ))}
        </div>

        {/* ── Post rows ── */}
        <div className="mb-32">
          {rest.map((post, i) => (
            <PostRow key={post.slug} post={post} index={i} />
          ))}
          <div className="border-t border-neutral-200" />
        </div>
      </div>
      <div className="mt-32">
        <Contact />
      </div>
    </main>
  );
}
