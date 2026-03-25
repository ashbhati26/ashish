"use client";

import { useRef, useEffect, useState } from "react";
import {
  useScroll,
  motion,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import RoundedButton from "../components/RoundedButton";
import Magnetic from "../components/Magnetic";
import { contactInfo, footerMeta, socials } from "../lib/data";
import { TransitionLink } from "../components/Pagetransition";

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
        hour12: true,
      }) + " GMT+5:30";

    setTime(format());
    const id = setInterval(() => setTime(format()), 60000);
    return () => clearInterval(id);
  }, []);

  return <>{time || "— GMT+5:30"}</>;
}

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const arcPathRef = useRef<SVGPathElement>(null);

  // 🔥 FIX: stable scroll tracking
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.95", "end 0.2"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  // arc animation
  const { scrollYProgress: arcProgress } = useScroll({
    target: container,
    offset: ["start 1", "start 0.3"],
  });

  useMotionValueEvent(arcProgress, "change", (v) => {
    if (!arcPathRef.current) return;
    const controlY = 140 * (1 - v);

    arcPathRef.current.setAttribute(
      "d",
      `M0 0 Q720 ${controlY} 1440 0 L1440 80 L0 80 Z`,
    );
  });

  // 🔥 FIX: force layout recalculation after mount
  useEffect(() => {
    const trigger = () => window.dispatchEvent(new Event("resize"));

    trigger();
    const t = setTimeout(trigger, 120);

    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={container} className="relative z-[3]">
      <motion.section className="bg-[var(--dark)] text-white flex flex-col justify-between pt-32 min-h-[60vh]">
        {/* 🔥 FIXED arc (no negative margin) */}
        <div className="absolute inset-x-0 -top-[80px] overflow-hidden pointer-events-none h-[80px]">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            width="100%"
            height="80"
          >
            <path
              ref={arcPathRef}
              d="M0 0 Q720 140 1440 0 L1440 80 L0 80 Z"
              fill="var(--dark)"
            />
          </svg>
        </div>

        <div className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40 w-full">
          {/* headline */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span
                className="relative rounded-full overflow-hidden flex-shrink-0"
                style={{
                  width: "clamp(52px, 7vw, 110px)",
                  height: "clamp(52px, 7vw, 110px)",
                }}
              >
                <Image
                  fill
                  alt="profile"
                  src="/me-icon.png"
                  className="object-cover"
                />
              </span>

              <h2
                className="m-0 font-normal leading-none"
                style={{ fontSize: "var(--text-contact-hero)" }}
              >
                Let&apos;s work together
              </h2>
            </div>

            <motion.svg
              style={{ rotate, scale: 2, flexShrink: 0 }}
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              className="hidden sm:block"
            >
              <path
                d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                fill="white"
              />
            </motion.svg>
          </div>

          {/* divider + CTA */}
          <div className="relative flex items-center justify-end mt-10">
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />

            <motion.div style={{ x }} className="relative z-10">
              <RoundedButton
                className="rounded-full border border-(--color-border-dark) flex items-center justify-center mr-20"
                style={{
                  width: "clamp(100px, 12vw, 180px)",
                  height: "clamp(100px, 12vw, 180px)",
                }}
              >
                <TransitionLink href="/contact">
                  <p
                    className="m-0 z-10 relative text-white text-center"
                    style={{ fontSize: "var(--text-sm)" }}
                  >
                    Get in touch
                  </p>
                </TransitionLink>
              </RoundedButton>
            </motion.div>
          </div>

          {/* contact pills */}
          <div className="flex flex-wrap gap-5 mt-10">
            {[contactInfo.email, contactInfo.phone].map((val) => (
              <RoundedButton
                key={val}
                className="rounded-full border border-white/20 flex items-center justify-center"
                style={{
                  padding: "clamp(10px, 1.2vw, 16px) clamp(20px, 3vw, 40px)",
                }}
              >
                <p
                  className="m-0 z-10 relative text-white"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {val}
                </p>
              </RoundedButton>
            ))}
          </div>

          {/* footer */}
          <div className="pb-10 mt-10 flex flex-col sm:flex-row sm:justify-between items-start sm:items-end text-white/40 gap-10">
            <div className="flex gap-12 lg:gap-20">
              {footerMeta.map(({ label }, i) => (
                <span key={label} className="flex flex-col gap-2">
                  <p
                    className="uppercase tracking-widest opacity-60 m-0"
                    style={{ fontSize: "var(--text-xs)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="m-0 text-white/70"
                    style={{ fontSize: "var(--text-sm)" }}
                  >
                    {i === 0 ? "2026 © Edition" : <LocalTime />}
                  </p>
                </span>
              ))}
            </div>

            <span className="flex flex-col gap-3">
              <p
                className="uppercase tracking-widest opacity-60 m-0"
                style={{ fontSize: "var(--text-xs)" }}
              >
                Socials
              </p>

              <div className="flex flex-wrap gap-6 lg:gap-8">
                {socials.map(({ label, href }) => (
                  <Magnetic key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                      style={{ fontSize: "var(--text-sm)" }}
                    >
                      {label}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
