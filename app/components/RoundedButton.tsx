'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from './Magnetic';

interface RoundedButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  backgroundColor?: string;
}

/** Resolves a value that might be a CSS variable like `var(--dark)` into its real color. */
function resolveColor(value: string): string {
  const match = value.match(/^var\((--[\w-]+)\)$/);
  if (!match) return value;
  return getComputedStyle(document.documentElement)
    .getPropertyValue(match[1])
    .trim();
}

export default function RoundedButton({
  children,
  backgroundColor = 'var(--brand)',
  className = '',
  ...rest
}: RoundedButtonProps) {
  const circle = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  useEffect(() => {
    const resolvedColor = resolveColor(backgroundColor);

    // Initial state
    gsap.set(circle.current, {
      backgroundColor: resolvedColor,
      top: '110%',
    });

    timeline.current = gsap.timeline({ paused: true });

    timeline.current
      // Circle animation (enter)
      .to(
        circle.current,
        {
          top: '-25%',
          width: '120%',
          duration: 0.4,
          ease: 'power3.in',
        },
        'enter'
      )

      // Text color → white on hover
      .to(
        textRef.current,
        {
          color: '#ffffff',
          duration: 0.2,
          ease: 'power2.out',
        },
        'enter'
      )

      // Circle exit animation
      .to(
        circle.current,
        {
          top: '-200%',
          width: '100%',
          duration: 0.35,
          ease: 'power3.out',
        },
        'exit'
      )

      // Reset text color
      .to(
        textRef.current,
        {
          color: '',
          duration: 0.2,
        },
        'exit'
      );
  }, [backgroundColor]);

  const onEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current?.tweenFromTo('enter', 'exit');
  };

  const onLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  return (
    <Magnetic>
      <div
        className={`relative overflow-hidden cursor-pointer ${className}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        {...rest}
      >
        {/* Text */}
        <span ref={textRef} className="relative z-10 transition-colors">
          {children}
        </span>

        {/* Animated background circle */}
        <div
          ref={circle}
          className="absolute left-[-10%] w-[120%] h-[200%] rounded-[50%] z-0"
        />
      </div>
    </Magnetic>
  );
}