import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface PillarProps {
  icon: string;
  heading: string;
  body: string;
  delay: number;
  inView: boolean;
}

const Pillar: React.FC<PillarProps> = ({ icon, heading, body, delay, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
      style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: '2rem',
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.6rem',
          color: '#00D084',
          marginBottom: '1.25rem',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>

      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '1.15rem',
          color: '#F5F5F2',
          marginBottom: '0.75rem',
          letterSpacing: '-0.01em',
        }}
      >
        {heading}
      </h3>

      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 400,
          fontSize: '0.95rem',
          color: '#A5A5A5',
          lineHeight: 1.65,
        }}
      >
        {body}
      </p>
    </motion.div>
  );
};

const pillars = [
  {
    icon: '↑',
    heading: 'Reichweite',
    body: 'Dein Creator-Profil wird zur Marke mit messbarer Wirkung.',
  },
  {
    icon: '⚡',
    heading: 'Technologie',
    body: 'SnapSell-Infrastruktur verbindet Content mit Commerce.',
  },
  {
    icon: '◇',
    heading: 'Beteiligung',
    body: 'Du profitierst vom Wachstum — fair und transparent.',
  },
];

const PartnershipSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: '-80px' });

  return (
    <section
      id="snapsell"
      ref={sectionRef}
      style={{
        backgroundColor: '#111417',
        scrollMarginTop: '80px',
      }}
    >
      <div className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 500,
            fontSize: '0.78rem',
            color: '#A5A5A5',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          (04) SNAPSELL TECHNOLOGIE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '2.5rem',
            maxWidth: '36ch',
          }}
        >
          Creator-Reichweite trifft Technologie
        </motion.h2>

        <div
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          className="w-full mb-12"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
        >
          {pillars.map((pillar, index) => (
            <Pillar
              key={pillar.heading}
              icon={pillar.icon}
              heading={pillar.heading}
              body={pillar.body}
              delay={index * 0.12}
              inView={inView}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 6',
          overflow: 'hidden',
        }}
      >
        <img
          src="/photos/snapsell-01.png"
          alt="SnapSell"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </section>
  );
};

export default PartnershipSection;
