import React from 'react';
import { ArrowRight, Users, Zap, ShoppingBag } from 'lucide-react';

const STEPS = [
  { label: 'Social Media',      icon: Users,       desc: 'Reichweite und Community aufbauen' },
  { label: 'Community',         icon: Users,       desc: 'Echte Verbindungen schaffen' },
  { label: 'AI Unterstützung',  icon: Zap,         desc: 'Inhalte und Kommunikation skalieren' },
  { label: 'SnapSell',          icon: ShoppingBag, desc: 'Digitale Angebote vermarkten' },
  { label: 'Verkauf',           icon: ShoppingBag, desc: 'Einnahmen direkt generieren' },
];

export const SnapSellJourneySection: React.FC = () => {
  return (
    <section id="system" className="py-24 lg:py-32 bg-[#050505]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        <div className="max-w-2xl mb-16">
          <p className="text-[11px] font-heading font-bold tracking-[0.15em] text-[#00D084] uppercase mb-4">
            AI + SnapSell
          </p>
          <h2 className="font-heading font-bold text-[#F5F5F2] leading-[1.0] tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
            CONTENT.<br />COMMUNITY.<br />COMMERCE.
          </h2>
        </div>

        {/* Flow */}
        <div className="overflow-x-auto pb-4">
          <div className="flex items-start gap-0 min-w-max">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.label}>
                  <div className="flex flex-col items-center text-center w-40">
                    <div className="w-14 h-14 rounded-2xl bg-[#111417] border border-white/8 flex items-center justify-center mb-4 hover:border-[#00D084]/40 transition-colors">
                      <Icon className="w-5 h-5 text-[#00D084]" />
                    </div>
                    <p className="font-heading font-bold text-[#F5F5F2] text-sm mb-1.5">{step.label}</p>
                    <p className="text-xs text-[#A5A5A5] font-body leading-snug max-w-[7rem]">{step.desc}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex items-center pt-6 px-2">
                      <ArrowRight className="w-4 h-4 text-[#00D084]/60" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <p className="mt-10 text-sm text-[#A5A5A5] font-body max-w-xl leading-relaxed">
          SnapSell ist die technologische Grundlage, die Content in Commerce verwandelt — unterstützt durch professionelle Begleitung und persönliche Guidance.
        </p>

      </div>
    </section>
  );
};
