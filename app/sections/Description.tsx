"use client";
import { useRef } from "react";
import {
  useInView,
  useScroll,
  useTransform,
  motion,
  Variants,
} from "framer-motion";
import RoundedButton from "../components/RoundedButton";
import { descriptionPhrase, descriptionBio } from "../lib/data";
import { TransitionLink } from "../components/Pagetransition";

const slideUp: Variants = {
  initial: { y: "100%" },
  open: (i: number) => ({
    y: "0%",
    transition: { duration: 0.5, delay: 0.01 * i },
  }),
  closed: { y: "100%", transition: { duration: 0.5 } },
};

const opacity: Variants = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.5 } },
  closed: { opacity: 0, transition: { duration: 0.5 } },
};

export default function Description() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    margin: "0px 0px -20% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const buttonY = useTransform(scrollYProgress, [0, 1], [120, -40]);

  return (
    <section
      ref={sectionRef}
      className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40 flex justify-center mt-[60px] md:mt-[100px]"
    >
      <div className="w-full flex flex-col md:flex-row gap-10 md:gap-12">
        <p
          className="m-0 leading-snug"
          style={{ fontSize: "var(--text-display-sm)" }}
        >
          {descriptionPhrase.split(" ").map((word, i) => (
            <span
              key={i}
              className="relative inline-flex overflow-hidden mr-[0.3em]"
            >
              <motion.span
                variants={slideUp}
                custom={i}
                animate={isInView ? "open" : "closed"}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>

        <div className="flex flex-col items-start gap-16 md:gap-40">
          <motion.p
            variants={opacity}
            animate={isInView ? "open" : "closed"}
            className="m-0 font-light text-neutral-600"
            style={{ fontSize: "var(--text-base)" }}
          >
            {descriptionBio}
          </motion.p>
          <motion.div style={{ y: buttonY }}>
            <RoundedButton className="w-44 h-44 rounded-full bg-black text-white flex items-center justify-center">
              <TransitionLink href="/about" className="no underline">
                <p
                  className="m-0 z-10 relative"
                  style={{ fontSize: "var(--text-base)" }}
                >
                  About me
                </p>
              </TransitionLink>
            </RoundedButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
