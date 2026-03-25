"use client";
import { useRef } from "react";
import { useInView, useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(headingRef, {
    once: false,
    margin: "0px 0px -20% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={sectionRef} className="bg-white">
      {/* ── consistent padding with all other pages ── */}
      <div className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40">
        {/* ── Heading ── */}
        <div ref={headingRef} className="pt-[clamp(100px,16vh,200px)]">
          <AnimatedHeading
            text={"Engineering products that\nscale in the digital world"}
            isInView={isInView}
            className="text-neutral-900"
          />
        </div>

        {/* ── Divider ── */}
        <div className="relative flex items-center justify-end mt-[clamp(32px,5vw,64px)]">
          <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-200" />
        </div>

        {/* ── Content Section ── */}
        <div
          className="mt-[clamp(40px,6vw,80px)] pb-[clamp(60px,10vh,140px)] grid gap-12 md:gap-16 items-start"
          style={{ gridTemplateColumns: "1fr 1.4fr" }}
        >
          {/* Left */}
          <div className="flex flex-col gap-6 pt-4">
            {/* Arrow */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 16L16 4M16 4H6M16 4V14"
                stroke="#111"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p
              className="m-0 leading-relaxed font-light text-neutral-800"
              style={{ fontSize: "var(--text-md)" }}
            >
              I build scalable digital products and tailored solutions for
              companies worldwide, focusing on performance, clean architecture,
              and long-term reliability.
            </p>

            <p
              className="m-0 leading-relaxed font-light text-neutral-400"
              style={{ fontSize: "var(--text-sm)" }}
            >
              Always exploring
            </p>
          </div>

          {/* Right Image */}
          <div
            className="relative overflow-hidden"
            style={{ height: "clamp(360px, 55vw, 700px)" }}
          >
            <motion.div
              ref={imageRef}
              style={{
                top: "-10%",
                bottom: "-10%",
                y: imageY,
              }}
              className="absolute inset-x-0 will-change-transform"
            >
              <Image
                src="/me.png"
                fill
                alt="Ashish Bhati"
                className="object-cover object-top"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
