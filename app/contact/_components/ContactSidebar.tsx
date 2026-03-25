"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Magnetic from "../../components/Magnetic";
import { contactInfo, socials } from "../../lib/data";

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1 + i * 0.08,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

interface Props {
  isInView: boolean;
}

export default function ContactSidebar({ isInView }: Props) {
  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      {/* Profile image */}
      <motion.div
        variants={fadeUp}
        custom={0}
        initial="initial"
        animate={isInView ? "open" : "initial"}
      >
        <span
          className="relative rounded-full overflow-hidden block"
          style={{
            width: "clamp(72px, 9vw, 120px)",
            height: "clamp(72px, 9vw, 120px)",
          }}
        >
          <Image
            fill
            alt="Ashish Bhati"
            src="/me-icon.png"
            className="object-cover"
          />
        </span>
      </motion.div>

      {/* Arrow */}
      <motion.div
        variants={fadeUp}
        custom={1}
        initial="initial"
        animate={isInView ? "open" : "initial"}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M3 3L15 15M15 15H5M15 15V5"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Contact details */}
      <motion.div
        variants={fadeUp}
        custom={2}
        initial="initial"
        animate={isInView ? "open" : "initial"}
        className="flex flex-col gap-3"
      >
        <p
          className="m-0 uppercase tracking-[0.2em] text-white/40"
          style={{ fontSize: "var(--text-xs)" }}
        >
          Contact Details
        </p>

        {[ 
          { label: contactInfo.email, href: `mailto:${contactInfo.email}` },
          { label: contactInfo.phone, href: `tel:${contactInfo.phone}` },
        ].map(({ label, href }) => (
          <motion.a
            key={label}
            href={href}
            className="relative w-fit no-underline font-light text-white/70"
            style={{ fontSize: "var(--text-sm)" }}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{
              rest: { x: 0 },
              hover: { x: 6 },
            }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Text */}
            <motion.span
              variants={{
                rest: { color: "rgba(255,255,255,0.7)" },
                hover: { color: "#ffffff" },
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>

            {/* Underline */}
            <motion.span
              variants={{
                rest: { width: 0 },
                hover: { width: "100%" },
              }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="absolute left-0 -bottom-1 h-[1px] bg-white"
            />
          </motion.a>
        ))}
      </motion.div>

      {/* Socials */}
      <motion.div
        variants={fadeUp}
        custom={3}
        initial="initial"
        animate={isInView ? "open" : "initial"}
        className="flex flex-col gap-3"
      >
        <p
          className="m-0 uppercase tracking-[0.2em] text-white/40"
          style={{ fontSize: "var(--text-xs)" }}
        >
          Socials
        </p>

        <div className="flex flex-col gap-2">
          {socials.map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-fit no-underline font-light text-white/70"
              style={{ fontSize: "var(--text-sm)" }}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={{
                rest: { x: 0 },
                hover: { x: 6 },
              }}
              transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Text */}
              <motion.span
                variants={{
                  rest: { color: "rgba(255,255,255,0.7)" },
                  hover: { color: "#ffffff" },
                }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>

              {/* Underline */}
              <motion.span
                variants={{
                  rest: { width: 0 },
                  hover: { width: "100%" },
                }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="absolute left-0 -bottom-1 h-[1px] bg-white"
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}