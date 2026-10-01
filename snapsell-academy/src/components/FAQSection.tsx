import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { FAQ_ITEMS } from '../data/agencyData';

export function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="faq"
      style={{
        background: '#050505',
        padding: 'clamp(5rem,10vw,10rem) clamp(1.5rem,6vw,8rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
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
        (07) FAQ
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(2rem,4vw,3rem)',
          color: '#F5F5F2',
          marginBottom: '4rem',
          maxWidth: '600px',
        }}
      >
        Häufige Fragen.
      </motion.h2>

      <div style={{ maxWidth: '860px' }}>
        {FAQ_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.07 }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem 0',
                background: 'none',
                border: 'none',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                textAlign: 'left',
                gap: '2rem',
              }}
            >
              <span style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(0.95rem,1.5vw,1.1rem)',
                color: '#F5F5F2',
              }}>
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: openIndex === i ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#00D084',
                  fontSize: '1.4rem',
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.95rem',
                    color: '#A5A5A5',
                    lineHeight: 1.75,
                    padding: '0 0 1.5rem',
                    maxWidth: '660px',
                  }}>
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        {/* Final border */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', height: 0 }} />
      </div>
    </section>
  );
}
