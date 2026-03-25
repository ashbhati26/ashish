"use client";
import { useRef, useState, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

import AnimatedHeading from "./_components/AnimatedHeading";
import FilterBar from "./_components/FilterBar";
import ListHeaders from "./_components/ListHeaders";
import ProjectRow from "./_components/ProjectRow";
import ProjectCard from "./_components/ProjectCard";
import {
  projects,
  categoryCounts,
  ProjectCategory,
  ViewMode,
} from "../lib/data";
import Contact from "../sections/Contact";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const MODAL_H = 280; // px — height of the floating image window

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

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // ── Hover modal ────────────────────────────────────────────────────────
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [isTouch, setIsTouch] = useState(false);

  const modalContainer   = useRef<HTMLDivElement>(null);
  const cursor           = useRef<HTMLDivElement>(null);
  const cursorLabel      = useRef<HTMLDivElement>(null);

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

  // ── Heading inView ─────────────────────────────────────────────────────
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: false, margin: "0px 0px -20% 0px" });

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory));

  const counts = categoryCounts(projects);

  return (
    <main onMouseMove={(e) => !isTouch && viewMode === "list" && moveItems(e.clientX, e.clientY)}>
      <div className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40">

        <div ref={headingRef} className="pt-[clamp(100px,16vh,200px)] pb-[clamp(48px,8vh,96px)]">
          <AnimatedHeading
            text={"Creating next level\ndigital products"}
            isInView={isInView}
          />
        </div>

        <FilterBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
          counts={counts}
          isInView={isInView}
        />

        {viewMode === "list" && (
          <div key={`list-${activeCategory}`}>
            <ListHeaders isInView={isInView} />
            <div className="mb-32">
              {filtered.map((project, i) => (
                <ProjectRow
                  key={project.title}
                  project={project}
                  index={i}
                  onHoverEnter={(x, y) => !isTouch && manageModal(true,  i, x, y)}
                  onHoverLeave={(x, y) => !isTouch && manageModal(false, i, x, y)}
                />
              ))}
              <div className="border-t border-neutral-200" />
            </div>
          </div>
        )}

        {viewMode === "grid" && (
          <div
            key={`grid-${activeCategory}`}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 sm:gap-y-16 mb-32"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* ── Hover modal (list view only) ── */}
      {!isTouch && viewMode === "list" && (
        <>
          {/*
            Same fix as Projects.tsx:
            - top:0 / left:0 so GSAP has a clean origin
            - scaleAnimation x/y handles the -50% centering via Framer transform
            - inner strip uses translateY(px) not top(%) → GPU-composited, no reflow
          */}
          <motion.div
            ref={modalContainer}
            variants={scaleAnimation}
            initial="initial"
            animate={modal.active ? "enter" : "closed"}
            className="fixed pointer-events-none overflow-hidden z-[50]"
            style={{ width: 380, height: MODAL_H, top: 0, left: 0 }}
          >
            <div
              className="absolute inset-x-0 top-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
              style={{ transform: `translateY(${modal.index * -MODAL_H}px)` }}
            >
              {filtered.map((p, i) => (
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
                    sizes="380px"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={cursor}
            variants={scaleAnimation}
            initial="initial"
            animate={modal.active ? "enter" : "closed"}
            className="fixed w-16 h-16 rounded-full pointer-events-none z-[51] bg-[var(--brand)]"
            style={{ top: 0, left: 0 }}
          />

          <motion.div
            ref={cursorLabel}
            variants={scaleAnimation}
            initial="initial"
            animate={modal.active ? "enter" : "closed"}
            className="fixed w-16 h-16 rounded-full pointer-events-none z-[52] flex items-center justify-center text-white"
            style={{ top: 0, left: 0, fontSize: "var(--text-xs)" }}
          >
            View
          </motion.div>
        </>
      )}

      <div className="mt-32 relative">
        <Contact key={viewMode} />
      </div>
    </main>
  );
}