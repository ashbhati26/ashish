"use client";
import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Hero() {
  const marqueeInner = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const xPercent = useRef(0);
  const direction = useRef(-1);
  const rafId = useRef<number>(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll-driven horizontal offset on the whole marquee wrapper
    gsap.to(marqueeInner.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => {
          direction.current = e.direction * -1;
        },
      },
      x: "-500px",
    });

    // Parallax on the background image
    gsap.fromTo(
      imageRef.current,
      { y: -80 },
      {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: "section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    const animate = () => {
      xPercent.current += 0.1 * direction.current;

      // Wrap: when the first copy has scrolled fully left (-100%), reset to 0
      if (xPercent.current <= -100) xPercent.current = 0;
      if (xPercent.current > 0) xPercent.current = -100;

      // Apply the same xPercent to every repeated item inside the flex row
      const items =
        marqueeInner.current?.querySelectorAll<HTMLElement>(".marquee-item");
      items?.forEach((el) => gsap.set(el, { xPercent: xPercent.current }));

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Repeat the label enough times to guarantee seamless wrap at any viewport width
  const REPEATS = 4;

  return (
    <section className="relative h-svh w-full overflow-hidden">
      {/* parallax image */}
      <div
        ref={imageRef}
        className="absolute inset-x-0 will-change-transform bg-[#999d9e]"
        style={{ top: -80, bottom: -80 }}
      >
        <Image
          src="/ashish-png.png"
          fill
          alt="background"
          className="
            object-cover 
            object-[center_calc(50%+120px)]

            md:object-contain 
            md:object-[center_calc(50%+120px)]
          "
          priority
        />
      </div>

      {/* bottom fade into Description */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.1) 75%, transparent 100%)",
          backdropFilter: "blur(12px)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
          maskImage:
            "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
        }}
      />

      {/* bottom-right role label */}
      <div className="absolute right-4 bottom-50 sm:right-8 md:bottom-60 md:right-12 lg:bottom-70 lg:right-20 z-20 text-left">
        <div className="flex justify-start mb-4 sm:mb-6 lg:mb-10">
          <svg
            width="16"
            height="16"
            viewBox="0 0 18 18"
            fill="none"
            className="rotate-90 sm:w-[18px] sm:h-[18px] lg:w-[22px] lg:h-[22px]"
          >
            <path
              d="M3 15L15 3M15 3H5M15 3V13"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="space-y-1 sm:space-y-2">
          <p
            className="text-white font-light leading-tight m-0"
            style={{ fontSize: "var(--text-hero-role)" }}
          >
            Freelance
          </p>
          <p
            className="text-white font-light leading-tight m-0"
            style={{ fontSize: "var(--text-hero-role)" }}
          >
            Designer & Developer
          </p>
        </div>
      </div>

      {/* ── Marquee ── */}
      <div className="absolute bottom-20 left-0 w-full z-20 overflow-hidden">
        {/*
          marqueeInner gets the GSAP scroll x-offset.
          Each .marquee-item gets the RAF-driven continuous xPercent.
          Using multiple copies (flex row, no wrapping) ensures the strip
          is always wider than the viewport so the loop is seamless.
        */}
        <div
          ref={marqueeInner}
          className="flex whitespace-nowrap will-change-transform"
        >
          {Array.from({ length: REPEATS }).map((_, i) => (
            <span
              key={i}
              className="marquee-item inline-block shrink-0 text-white font-medium select-none pr-8 sm:pr-12 lg:pr-16 will-change-transform"
              style={{
                fontSize: "clamp(52px, 13vw, 210px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Ashish Bhati —
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
