import React from 'react';
import { PLACEHOLDER_MARK, PLACEHOLDER_STUDIO, PLACEHOLDER_PRODUCTION } from '../data/agencyData';

const COLUMNS = [
  {
    role: 'MARK',
    items: ['Erfahrung.', 'Guidance.', 'Netzwerk.'],
    image: PLACEHOLDER_MARK,
    alt: 'Mark Aurel',
  },
  {
    role: 'TEAM',
    items: ['Marketing.', 'Technologie.', 'Organisation.'],
    image: PLACEHOLDER_STUDIO,
    alt: 'Kreatives Team im Studio',
  },
  {
    role: 'CREATOR',
    items: ['Identität.', 'Content.', 'Wachstum.'],
    image: PLACEHOLDER_PRODUCTION,
    alt: 'Creator bei der Produktion',
  },
];

export const ExpertTeamSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#111417]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        <div className="max-w-xl mb-16">
          <p className="text-[11px] font-heading font-bold tracking-[0.15em] text-[#00D084] uppercase mb-4">
            Wie es funktioniert
          </p>
          <h2 className="font-heading font-bold text-[#F5F5F2] leading-[1.0] tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
            DREI ROLLEN.<br />EIN CREATOR-BUSINESS.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map(col => (
            <div key={col.role} className="group">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-6">
                <img
                  src={col.image}
                  alt={col.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.7) saturate(0.85)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111417] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="font-heading font-bold text-[#F5F5F2] text-2xl tracking-widest">{col.role}</p>
                </div>
              </div>
              <ul className="space-y-1.5 px-1">
                {col.items.map(item => (
                  <li key={item} className="font-heading font-semibold text-[#A5A5A5] text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
