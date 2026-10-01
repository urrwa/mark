import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const STEPS = [
  { num: '01', heading: 'Konzept', body: 'Gemeinsam entwickeln wir deine Content-Strategie und definieren dein Alleinstellungsmerkmal.' },
  { num: '02', heading: 'Produktion', body: 'Professionelle Foto- und Videoproduktion in unserem Studio – von der Idee bis zum fertigen Content.' },
  { num: '03', heading: 'Veröffentlichung', body: 'Distribution über alle relevanten Kanäle mit datengetriebenem Timing und optimierter Reichweite.' },
  { num: '04', heading: 'Skalierung', body: 'Wir messen, optimieren und skalieren – kontinuierlich und messbar.' },
];

export function ProfessionalProductionsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="produktion"
      style={{ background: '#111417', padding: 'clamp(5rem,10vw,10rem) clamp(1.5rem,6vw,8rem)' }}
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          color: '#A5A5A5',
          textTransform: 'uppercase',
          marginBottom: '3rem',
        }}
      >
        (05) PRODUKTION
      </motion.p>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(2.2rem,5vw,4rem)',
          color: '#F5F5F2',
          lineHeight: 0.95,
          marginBottom: '4rem',
          maxWidth: '700px',
        }}
      >
        Von der Idee zum fertigen Content.
      </motion.h2>

      {/* Photo strip */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{
          width: '100%',
          aspectRatio: '21/7',
          overflow: 'hidden',
          marginBottom: '4rem',
          borderRadius: '2px',
        }}
      >
        <img
          src="/photos/collab-02.png"
          alt="Professionelle Content-Produktion im Studio"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          loading="lazy"
        />
      </motion.div>

      {/* Steps grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0' }}>
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.1 }}
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              padding: '2rem 2rem 2rem 0',
            }}
          >
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.8rem',
              color: '#00D084',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}>
              {step.num}
            </p>
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#F5F5F2',
              marginBottom: '0.75rem',
            }}>
              {step.heading}
            </h3>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.9rem',
              color: '#A5A5A5',
              lineHeight: 1.7,
            }}>
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
