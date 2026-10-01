import React, { useState } from 'react';
import { Eye, MessageSquare, Tag, CreditCard, Repeat, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { trackEvent } from '../data/academyData';

export const ConnectedJourneySection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: 1,
      name: 'CONTENT',
      subtitle: 'Erzeugt Aufmerksamkeit',
      icon: Eye,
      engine: 'KI-Content-Engine',
      description: 'Ästhetischer Foto- und Video-Content, kontinuierlich veröffentlicht, um organische Reichweite aufzubauen – ohne tägliches Drehen.'
    },
    {
      id: 2,
      name: 'KONVERSATION',
      subtitle: 'Baut die Beziehung auf',
      icon: MessageSquare,
      engine: 'KI-Chat-Assistent',
      description: 'Sofortige 24/7-Antworten, Qualifizierung von Kaufinteresse und natürlicher Austausch in den Direktnachrichten.'
    },
    {
      id: 3,
      name: 'ANGEBOT',
      subtitle: 'Empfiehlt echten Mehrwert',
      icon: Tag,
      engine: 'Personalisierte Kuration',
      description: 'Maßgeschneiderte digitale Bundles und exklusive Mediensammlungen, präsentiert genau im Moment der Kaufabsicht.'
    },
    {
      id: 4,
      name: 'ZAHLUNG',
      subtitle: 'Schließt den Kauf ab',
      icon: CreditCard,
      engine: 'SnapSell-Direkt-Paylink',
      description: '1-Klick-Checkout mit Apple Pay oder Kreditkarte. Sofortige Freischaltung des Contents ohne Reibungsverluste.'
    },
    {
      id: 5,
      name: 'FOLLOW-UP',
      subtitle: 'Fördert die Kundenbindung',
      icon: Repeat,
      engine: 'Growth-Team-Support',
      description: 'Automatisiertes Re-Engagement, private VIP-Einladungen und kontinuierliche Feedbackschleifen für neuen Content.'
    }
  ];

  return (
    <section
      id="journey"
      className="relative py-24 sm:py-32 bg-[#101310] border-t border-[#171B18] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-[#00C875]" />
            WIE ALLES ZUSAMMENHÄNGT
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-6">
            VON AUFMERKSAMKEIT ZUR ZAHLUNG
          </h2>

          <p className="text-base sm:text-lg text-[#99A49F] mb-6">
            Vier ineinandergreifende Elemente, die einen nahtlosen Creator-Umsatzkreislauf antreiben:
          </p>

          {/* Quick Summary Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3 rounded-xl bg-[#050706] border border-[#171B18]">
              <div className="text-xs font-bold text-[#00C875] uppercase">KI-Content</div>
              <div className="text-[11px] text-[#99A49F]">erzeugt Aufmerksamkeit.</div>
            </div>
            <div className="p-3 rounded-xl bg-[#050706] border border-[#171B18]">
              <div className="text-xs font-bold text-[#00C875] uppercase">KI-Chat</div>
              <div className="text-[11px] text-[#99A49F]">baut die Beziehung auf.</div>
            </div>
            <div className="p-3 rounded-xl bg-[#050706] border border-[#171B18]">
              <div className="text-xs font-bold text-[#00C875] uppercase">SnapSell</div>
              <div className="text-[11px] text-[#99A49F]">schließt den Kauf ab.</div>
            </div>
            <div className="p-3 rounded-xl bg-[#050706] border border-[#171B18]">
              <div className="text-xs font-bold text-[#00C875] uppercase">Mark & Growth-Team</div>
              <div className="text-[11px] text-[#99A49F]">helfen dir beim Skalieren.</div>
            </div>
          </div>
        </div>

        {/* The 5-Stage Connected Pipeline */}
        <div className="relative mb-12">
          
          {/* Emerald Pathway Line (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-12 right-12 h-1 bg-gradient-to-r from-[#00C875] via-[#24E68A] to-[#00C875] z-0 opacity-40" />

          {/* Stages Grid (Horizontal Desktop, Vertical Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
            {stages.map((st, idx) => {
              const Icon = st.icon;
              const isSelected = activeStage === idx;

              return (
                <div
                  key={st.id}
                  onClick={() => {
                    setActiveStage(idx);
                    trackEvent('Connected Journey Stage Clicked', { stage: st.name });
                  }}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#171B18] border-[#00C875] shadow-xl shadow-[#00C875]/10 -translate-y-1'
                      : 'bg-[#050706] border-[#171B18] hover:border-[#00C875]/30'
                  }`}
                >
                  <div>
                    {/* Circle Node on Line */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isSelected
                          ? 'bg-[#00C875] border-[#24E68A] text-[#050706]'
                          : 'bg-[#101310] border-[#171B18] text-[#00C875]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-heading font-bold text-[#99A49F] tracking-widest uppercase">
                        Stufe 0{st.id}
                      </span>
                    </div>

                    <div className="text-[10px] font-semibold text-[#00C875] uppercase tracking-wider mb-1">
                      {st.subtitle}
                    </div>

                    <h4 className="font-heading text-lg font-bold text-[#F4F7F5] mb-2">
                      {st.name}
                    </h4>

                    <p className="text-xs text-[#99A49F] leading-relaxed mb-4">
                      {st.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#171B18] text-[10px] text-[#99A49F] flex items-center justify-between">
                    <span>System:</span>
                    <span className="font-semibold text-[#F4F7F5]">{st.engine}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Growth Loop Return Callout */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#050706] border border-[#00C875]/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00C875]/20 flex items-center justify-center text-[#00C875] shrink-0">
              <Repeat className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xs font-heading font-bold text-[#F4F7F5] uppercase tracking-wider">
                Kontinuierlicher Wachstums-Kreislauf
              </div>
              <div className="text-[11px] text-[#99A49F]">
                Follow-up-Feedback leitet die Nachfrage der Zielgruppe direkt zurück in die gezielte KI-Content-Produktion.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#00C875]">
            <span>KREISLAUF AKTIV</span>
            <span className="w-2 h-2 rounded-full bg-[#00C875] animate-ping" />
          </div>
        </div>

      </div>
    </section>
  );
};
