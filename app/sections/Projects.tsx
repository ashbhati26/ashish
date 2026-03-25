"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { TransitionLink } from "../components/Pagetransition";
import RoundedButton from "../components/RoundedButton";
import { projects } from "../lib/data";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: EASE },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.4,
      ease: [0.32, 0, 0.67, 0] as [number, number, number, number],
    },
  },
};

const visibleProjects = projects.slice(0, 2);
const MODAL_H = 350; // height of the modal window in px

export default function Projects() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const [isTouch, setIsTouch] = useState(false);

  const modalContainer   = useRef<HTMLDivElement>(null);
  const cursor           = useRef<HTMLDivElement>(null);
  const cursorLabel      = useRef<HTMLDivElement>(null);
  const sectionRef       = useRef<HTMLElement>(null);

  const xMoveContainer   = useRef<gsap.QuickToFunc | null>(null);
  const yMoveContainer   = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursor      = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursor      = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);

    xMoveContainer.current   = gsap.quickTo(modalContainer.current, "left", { duration: 0.8,  ease: "power3" });
    yMoveContainer.current   = gsap.quickTo(modalContainer.current, "top",  { duration: 0.8,  ease: "power3" });
    xMoveCursor.current      = gsap.quickTo(cursor.current,         "left", { duration: 0.5,  ease: "power3" });
    yMoveCursor.current      = gsap.quickTo(cursor.current,         "top",  { duration: 0.5,  ease: "power3" });
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current,    "left", { duration: 0.45, ease: "power3" });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current,    "top",  { duration: 0.45, ease: "power3" });
  }, []);

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current?.(x);
    yMoveContainer.current?.(y);
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveCursorLabel.current?.(x);
    yMoveCursorLabel.current?.(y);
  };

  const manageModal = (active: boolean, index: number, x: number, y: number) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={(e) => !isTouch && moveItems(e.clientX, e.clientY)}
      className="flex flex-col items-center mt-[80px] md:mt-[100px]"
    >
      <div className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40 w-full">
        <div className="flex items-center justify-between pb-4">
          <p
            className="text-neutral-400 uppercase tracking-[0.2em]"
            style={{ fontSize: "var(--text-xs)" }}
          >
            Recent work
          </p>
        </div>
        <div className="w-full h-px bg-neutral-200" />
      </div>

      <div className="w-full border-b border-neutral-200">
        {visibleProjects.map((project, i) => (
          <div
            key={project.title}
            onMouseEnter={(e) => !isTouch && manageModal(true,  i, e.clientX, e.clientY)}
            onMouseLeave={(e) => !isTouch && manageModal(false, i, e.clientX, e.clientY)}
            className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40 flex justify-between items-center py-6 md:py-[50px] border-t border-neutral-200 cursor-pointer group"
          >
            <h2 className="m-0 text-3xl md:text-6xl font-normal transition-transform duration-300 group-hover:-translate-x-2">
              {project.title}
            </h2>
            <p className="text-sm font-light text-neutral-500 transition-transform duration-300 group-hover:translate-x-2">
              {project.services}
            </p>
          </div>
        ))}
      </div>

      <RoundedButton className="mt-[80px] mb-[80px] rounded-full border border-(--color-border) flex items-center justify-center px-16 py-4">
        <TransitionLink
          href="/work"
          className="m-0 z-10 relative"
          style={{ fontSize: "var(--text-sm)" }}
        >
          More work
        </TransitionLink>
      </RoundedButton>

      {!isTouch && (
        <>
          <motion.div
            ref={modalContainer}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className="fixed pointer-events-none overflow-hidden z-[3]"
            style={{ width: 400, height: MODAL_H, top: 0, left: 0 }}
          >
            {/*
              Inner strip: images stacked vertically, shifted by exact px.
              Using translateY(index * -MODAL_H px) instead of top% so the
              CSS transition is GPU-composited (no layout reflow = buttery smooth).
            */}
            <div
              className="absolute inset-x-0 top-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
              style={{ transform: `translateY(${index * -MODAL_H}px)` }}
            >
              {visibleProjects.map((p, i) => (
                <div
                  key={i}
                  className="relative w-full overflow-hidden"
                  style={{ height: MODAL_H, backgroundColor: p.color }}
                >
                  <Image
                    src={p.image}
                    fill
                    alt={p.title}
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={cursor}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className="fixed w-20 h-20 rounded-full pointer-events-none z-[3] bg-[var(--brand)]"
            style={{ top: 0, left: 0 }}
          />

          <motion.div
            ref={cursorLabel}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className="fixed w-20 h-20 rounded-full pointer-events-none z-[3] flex items-center justify-center text-white"
            style={{ top: 0, left: 0, fontSize: "var(--text-sm)" }}
          >
            View
          </motion.div>
        </>
      )}
    </section>
  );
}