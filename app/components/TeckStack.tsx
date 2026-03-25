'use client';
import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

const stack = [
  { label: 'Next.js',        category: 'Framework'  },
  { label: 'React',          category: 'UI'         },
  { label: 'JavaScript',     category: 'Language'   },
  { label: 'TypeScript',     category: 'Language'   },
  { label: 'Java',           category: 'Language'   },
  { label: 'Node.js',        category: 'Runtime'    },
  { label: 'Express',        category: 'Backend'    },
  { label: 'Convex',         category: 'Backend'    },
  { label: 'MongoDB',        category: 'Database'   },
  { label: 'PostgreSQL',     category: 'Database'   },
  { label: 'Tailwind CSS',   category: 'Styling'    },
  { label: 'Framer Motion',  category: 'Animation'  },
  { label: 'GSAP',           category: 'Animation'  },
  { label: 'Git',            category: 'Tooling'    },
  { label: 'GitHub',         category: 'Tooling'    },
  { label: 'Postman',        category: 'Tooling'    },
];

/* separator glyph between items */
const SEP = '✦';

/* Duplicate the array so the marquee loop is seamless */
const row1 = [...stack, ...stack];
const row2 = [...stack].reverse();
const row2Dup = [...row2, ...row2];

/* ─────────────────────────────────────────────
   Single infinite marquee track
───────────────────────────────────────────── */
function MarqueeTrack({
  items,
  direction = 1,
  speed = 30,
}: {
  items: typeof stack;
  direction?: 1 | -1;
  speed?: number;
}) {
  // keyframe animation via inline style — no external dep needed
  const duration = `${(items.length / 2) * speed / 10}s`;

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex items-center gap-0 will-change-transform"
        style={{
          animation: `marquee-scroll ${duration} linear infinite`,
          animationDirection: direction === -1 ? 'reverse' : 'normal',
          width: 'max-content',
        }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-0 shrink-0">
            <span
              className="px-8 py-1 flex items-baseline gap-2 cursor-default group whitespace-nowrap"
            >
              <span
                className="font-normal text-neutral-900 group-hover:text-[var(--brand)] transition-colors duration-300"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.65rem)' }}
              >
                {item.label}
              </span>
              <span
                className="font-light text-neutral-400 uppercase tracking-[0.15em] group-hover:text-neutral-600 transition-colors duration-300"
                style={{ fontSize: 'var(--text-xs)' }}
              >
                {item.category}
              </span>
            </span>
            <span
              className="text-neutral-300 shrink-0 select-none"
              style={{ fontSize: 'clamp(0.6rem, 1vw, 0.8rem)' }}
            >
              {SEP}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main exported component
───────────────────────────────────────────── */
export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '0px 0px -8% 0px' });

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 overflow-hidden"
      aria-label="Tech stack"
    >
      {/* ── Section label ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40 mb-12"
      >
        <div className="flex items-center gap-4">
          <p
            className="m-0 uppercase tracking-[0.2em] text-neutral-400 font-light"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            Technologies
          </p>
        </div>
      </motion.div>

      {/* ── Row 1: left → right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="border-t border-b border-neutral-200 py-5 mb-4"
      >
        <MarqueeTrack items={row1} direction={1} speed={28} />
      </motion.div>

      {/* ── Row 2: right → left ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="border-b border-neutral-200 py-5"
      >
        <MarqueeTrack items={row2Dup} direction={-1} speed={32} />
      </motion.div>

      {/* ── Keyframe injection ── */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}