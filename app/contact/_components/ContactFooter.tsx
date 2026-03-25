'use client';
import { useEffect, useState } from 'react';
import Magnetic from '../../components/Magnetic';
import { footerMeta, socials } from '../../lib/data';

function LocalTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata',
        hour12: true,
      }) + ' GMT+5:30';

    setTime(format());
    const id = setInterval(() => setTime(format()), 60_000);
    return () => clearInterval(id);
  }, []);

  return <>{time || '— GMT+5:30'}</>;
}

export default function ContactFooter() {
  return (
    <div
      className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end text-white/40 pb-10 mt-16"
      style={{ gap: 'clamp(24px, 3vw, 40px)' }}
    >
      {/* Version + local time */}
      <div className="flex gap-12 lg:gap-20">
        {footerMeta.map(({ label }, i) => (
          <span key={label} className="flex flex-col gap-2">
            <p
              className="uppercase tracking-widest opacity-60 m-0"
              style={{ fontSize: 'var(--text-xs)' }}
            >
              {label}
            </p>
            <p
              className="m-0 text-white/70 font-light"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {i === 0 ? '2026 © Edition' : <LocalTime />}
            </p>
          </span>
        ))}
      </div>

      {/* Socials */}
      <span className="flex flex-col gap-3">
        <p
          className="uppercase tracking-widest opacity-60 m-0"
          style={{ fontSize: 'var(--text-xs)' }}
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
                className="m-0 cursor-pointer hover:text-white transition-colors font-light"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {label}
              </a>
            </Magnetic>
          ))}
        </div>
      </span>
    </div>
  );
}