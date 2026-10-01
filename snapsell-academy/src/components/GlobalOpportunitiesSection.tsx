import React from 'react';
import { PLACEHOLDER_CYPRUS } from '../data/agencyData';

const ITEMS = ['Training Sessions', 'Produktionstage', 'Creator Networking'];

export const GlobalOpportunitiesSection: React.FC = () => {
  return (
    <section id="zypern" className="relative py-24 lg:py-40 overflow-hidden">
      {/* Full-width background */}
      <div className="absolute inset-0">
        <img
          src={PLACEHOLDER_CYPRUS}
          alt="Mediterrane Küste auf Zypern"
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45) saturate(0.85)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-[#050505]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-[11px] font-heading font-bold tracking-[0.15em] text-[#00D084] uppercase mb-4">
            Optionale Möglichkeit
          </p>
          <h2 className="font-heading font-bold text-[#F5F5F2] leading-[1.0] tracking-tight mb-8"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}>
            TREFFEN.<br />PRODUZIEREN.<br />VERBINDEN.<br />IN ZYPERN.
          </h2>

          <div className="flex flex-wrap gap-3 mb-10">
            {ITEMS.map(item => (
              <span key={item} className="px-4 py-2 bg-[#050505]/70 backdrop-blur-sm border border-white/15 rounded-full text-sm font-heading font-semibold text-[#F5F5F2]">
                {item}
              </span>
            ))}
          </div>

          <p className="text-sm text-[#A5A5A5] font-body leading-relaxed border-l-2 border-[#00D084]/40 pl-4 italic">
            Verfügbare Möglichkeiten hängen von Auswahl, Verfügbarkeit und vereinbarten Bedingungen ab.
          </p>
        </div>
      </div>
    </section>
  );
};
