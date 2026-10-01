import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const roles = [
  'Creator-Mentor',
  'Branchenexperte',
  'Gründer',
  'Netzwerk-Connector',
];

export function MeetMarkSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="ueber-mark"
      ref={ref}
      style={{ backgroundColor: '#050505' }}
      className="relative overflow-hidden px-6 py-24 md:py-32 lg:px-16 xl:px-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[55%_45%] md:gap-0">
        {/* Left column — photo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-end md:pr-12"
        >
          <div
            className="w-full max-w-[480px] overflow-hidden"
            style={{ aspectRatio: '3/4', translate: '0 0' }}
          >
            <img
              src="/photos/mark-01.png"
              alt="Mark Aurel"
              className="h-full w-full object-cover object-center"
              style={{ translate: '4% 0' }}
            />
          </div>
        </motion.div>

        {/* Right column — content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center gap-6 md:pl-8 lg:pl-12"
        >
          {/* Section label */}
          <p
            className="text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: '#A5A5A5', fontFamily: 'Manrope, sans-serif' }}
          >
            (03) Über Mark
          </p>

          {/* Headline */}
          <h2
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F2',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Der Mann hinter der Marke
          </h2>

          {/* Divider */}
          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopWidth: 1 }} />

          {/* Body */}
          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '1rem',
              lineHeight: 1.75,
              color: '#A5A5A5',
            }}
          >
            Mark Aurel ist Creator-Mentor, Branchenexperte und Gründer der Creator Agency.
            Er verbindet persönliche Produktionserfahrung mit strategischer Markenentwicklung
            – unterstützt durch SnapSell-Technologie.
          </p>

          {/* Role badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {roles.map((role) => (
              <span
                key={role}
                style={{
                  backgroundColor: '#111417',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#F5F5F2',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                }}
                className="rounded-full px-4 py-1.5"
              >
                {role}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
