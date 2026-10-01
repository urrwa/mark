import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const responsibilities = [
  'Positionierung & Strategie',
  'Content-Produktion',
  'Community-Management',
  'Monetarisierung',
  'Tech & Analytics',
];

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section
      id="das-problem"
      ref={ref}
      style={{ backgroundColor: '#050505' }}
      className="overflow-hidden"
    >
      {/* Text block */}
      <div className="px-6 py-24 md:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            <p
              className="text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: '#A5A5A5', fontFamily: 'Manrope, sans-serif' }}
            >
              (03) Das Problem
            </p>

            <h2
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                color: '#F5F5F2',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
              }}
            >
              Du machst alles selbst. Wir übernehmen den Rest.
            </h2>

            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopWidth: 1 }} />
          </motion.div>

          {/* Right — numbered list */}
          <div className="flex flex-col justify-center">
            {responsibilities.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-center gap-5 py-4">
                  <span
                    style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      color: '#00D084',
                      minWidth: '2rem',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 400,
                      fontSize: '1rem',
                      color: '#F5F5F2',
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </span>
                </div>
                {i < responsibilities.length - 1 && (
                  <hr style={{ borderColor: 'rgba(255,255,255,0.08)', borderTopWidth: 1 }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image strip */}
      <div
        style={{ backgroundColor: '#111417' }}
        className="w-full overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ aspectRatio: '16/7' }}
          className="w-full"
        >
          <img
            src="/photos/benefit-01.png"
            alt="Workspace"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
}
