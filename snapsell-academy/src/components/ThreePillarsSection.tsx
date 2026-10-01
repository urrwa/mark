import React, { useState } from 'react';
import { MessageSquare, Sparkles, ShoppingBag, ArrowRight, Zap } from 'lucide-react';
import { trackEvent } from '../data/academyData';

export const ThreePillarsSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: 1,
      targetSection: 'ai-chat',
      title: 'KI-CHAT-SUPPORT',
      tagline: 'Konversationen aufbauen & Käufer qualifizieren',
      icon: MessageSquare,
      summary: 'Der intelligente 24/7-Konversationsassistent beantwortet wiederkehrende Anfragen, klärt Käuferfragen und teilt Kauf-Links nahtlos.',
      accent: 'Smarte Kommunikation',
      metrics: 'Keine verpassten DMs • Sofortige Antwort'
    },
    {
      id: 2,
      targetSection: 'ai-content',
      title: 'KI-CONTENT-ERSTELLUNG',
      tagline: 'Aufmerksamkeit erzeugen & Output skalieren',
      icon: Sparkles,
      summary: 'Verwandle deine freigegebene Identität in hochkarätige Lifestyle-Bilder, Reels, Stories und mehrsprachige Video-Assets.',
      accent: 'Konsistente Produktion',
      metrics: '1 freigegebene Identität • Multiformat-Skalierung'
    },
    {
      id: 3,
      targetSection: 'snapsell',
      title: 'SNAPSELL-DIREKTVERKÄUFE',
      tagline: 'Interesse in reibungslose Verkäufe verwandeln',
      icon: ShoppingBag,
      summary: 'Direkter digitaler Vertrieb ohne einschränkende Plattform-Algorithmen. Bepreise deinen Content, generiere einen Link und liefere sofort aus.',
      accent: 'Direkte Monetarisierung',
      metrics: '1-Link-Checkout • Volle Kontrolle'
    }
  ];

  const handlePillarClick = (targetSection: string, title: string) => {
    trackEvent('Pillar Selected', { title, targetSection });
    const el = document.getElementById(targetSection);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="system"
      className="relative py-24 sm:py-32 bg-[#101310] border-t border-[#171B18] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-[#00C875]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-[#00C875]" />
            DAS KERN-SYSTEM
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-4">
            DREI SÄULEN. EIN CREATOR-BUSINESS.
          </h2>

          <p className="text-base sm:text-lg text-[#99A49F] mb-3">
            Alles in der Academy basiert auf drei miteinander verknüpften Systemen.
          </p>

          <p className="font-heading text-sm sm:text-base font-semibold text-[#00C875] uppercase tracking-wider">
            Aufmerksamkeit erzeugen. Konversationen aufbauen. Interesse in Verkäufe verwandeln.
          </p>
        </div>

        {/* Central Composite: Mark Aurel surrounded by the 3 Interactive Pillars */}
        <div className="relative mb-12">
          
          {/* Connecting Animated Emerald Line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#00C875]/40 to-transparent -translate-y-1/2 z-0" />

          {/* Three Pillar Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === idx;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`group rounded-2xl p-6 sm:p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-[#171B18] border-[#00C875] shadow-2xl shadow-[#00C875]/10 -translate-y-1'
                      : 'bg-[#050706]/90 border-[#171B18] hover:border-[#00C875]/40 hover:bg-[#171B18]/70'
                  }`}
                >
                  <div>
                    {/* Top Status & Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#00C875] text-[#050706]' : 'bg-[#101310] text-[#00C875] border border-[#171B18]'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-heading font-bold text-[#99A49F] tracking-widest uppercase">
                        0{pillar.id}
                      </span>
                    </div>

                    {/* Pillar Title */}
                    <div className="text-xs font-semibold text-[#00C875] uppercase tracking-wider mb-2">
                      {pillar.accent}
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F4F7F5] mb-3">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-sm font-semibold text-[#F4F7F5]/90 mb-3">
                      {pillar.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-[#99A49F] leading-relaxed mb-6">
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#171B18] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#99A49F]">
                      {pillar.metrics}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePillarClick(pillar.targetSection, pillar.title);
                      }}
                      className="inline-flex items-center gap-1 font-heading font-bold text-[#00C875] group-hover:underline cursor-pointer"
                    >
                      Details
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Central Human Guide Banner: Mark connects the system */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#050706] border border-[#171B18] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#00C875]/40 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
                alt="Mark Aurel Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-heading font-bold text-[#F4F7F5]">
                Integriert von Mark Aurel
              </div>
              <div className="text-[11px] text-[#99A49F]">
                Verbindet Aufmerksamkeit, automatisierte Konversationen und Direktverkäufe zu einem verlässlichen Motor.
              </div>
            </div>
          </div>

          <a
            href="#ai-chat"
            className="text-xs font-heading font-bold text-[#00C875] hover:text-[#24E68A] uppercase tracking-wider whitespace-nowrap"
          >
            Säule 1 entdecken: KI-Chat →
          </a>
        </div>

      </div>
    </section>
  );
};
