'use client';
import { motion, Variants } from 'framer-motion';
import RoundedButton from '../../components/RoundedButton';
import { ProjectCategory, ViewMode } from '../../lib/data';

const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as any } },
  closed: { opacity: 0, y: 24 },
};

interface Props {
  activeCategory: ProjectCategory;
  setActiveCategory: (c: ProjectCategory) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  counts: Record<ProjectCategory, number>;
  isInView: boolean;
}

const categories: ProjectCategory[] = ['All', 'Design', 'Development'];

// ─── Change hover/active fill color here ───────────────────────────────────
const HOVER_COLOR = '#1c1d21'; // --dark
// ───────────────────────────────────────────────────────────────────────────

export default function FilterBar({
  activeCategory, setActiveCategory,
  viewMode, setViewMode,
  counts, isInView,
}: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate={isInView ? 'open' : 'closed'}
      transition={{ delay: 0.35 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-[clamp(40px,7vh,80px)]"
    >
      {/* category pills */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;

          return (
            <RoundedButton
              key={cat}
              backgroundColor={HOVER_COLOR}
              onClick={() => setActiveCategory(cat)}
              className={`border border-(--color-border) rounded-full flex items-center justify-center cursor-pointer px-5 py-[10px] transition-colors duration-300 ${
                isActive ? 'bg-[#1c1d21]' : 'bg-transparent'
              }`}
            >
              <p
                className={`m-0 z-10 relative whitespace-nowrap text-[13px] font-light ${
                  isActive ? 'text-white' : ''
                }`}
              >
                {cat}
                {cat !== 'All' && (
                  <sup className="text-[10px] opacity-65 ml-0.5">{counts[cat]}</sup>
                )}
              </p>
            </RoundedButton>
          );
        })}
      </div>

      {/* view toggle */}
      <div className="flex items-center gap-2">
        {(['list', 'grid'] as ViewMode[]).map((mode) => {
          const isActive  = viewMode === mode;
          const iconColor = isActive ? 'white' : '#555';

          return (
            <RoundedButton
              key={mode}
              backgroundColor={HOVER_COLOR}
              onClick={() => setViewMode(mode)}
              className={`border border-(--color-border) w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                isActive ? 'bg-[#1c1d21]' : 'bg-transparent'
              }`}
            >
              {mode === 'list' ? (
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="z-10 relative">
                  <line x1="0" y1="1"  x2="14" y2="1"  stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="0" y1="5"  x2="14" y2="5"  stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="0" y1="9"  x2="14" y2="9"  stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="z-10 relative">
                  <rect x="0"   y="0"   width="5.5" height="5.5" rx="1" stroke={iconColor} strokeWidth="1.2"/>
                  <rect x="8.5" y="0"   width="5.5" height="5.5" rx="1" stroke={iconColor} strokeWidth="1.2"/>
                  <rect x="0"   y="8.5" width="5.5" height="5.5" rx="1" stroke={iconColor} strokeWidth="1.2"/>
                  <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke={iconColor} strokeWidth="1.2"/>
                </svg>
              )}
            </RoundedButton>
          );
        })}
      </div>
    </motion.div>
  );
}