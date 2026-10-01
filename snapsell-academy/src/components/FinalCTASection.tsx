import React from 'react';
import { ArrowUpRight, CheckCircle2, MessageSquare, Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../data/academyData';

export const FinalCTASection: React.FC = () => {
  const handleCta = (label: string) => {
    trackEvent('Final CTA Clicked', { label });
    const el = document.getElementById('apply');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const bullets = [
    'KI-Chat-Support',
    'KI-Content-Erstellung',
    'Direktverkäufe über SnapSell',
    'Professionelle Produktionsunterstützung',
    'Creator-Kollaborationen',
    'Internationale Chancen',
    'Begleitung durch Mark und sein Team'
  ];

  return (
    <section
      id="final-cta"
      className="relative py-24 sm:py-32 bg-[#050706] border-t border-[#171B18] overflow-hidden"
    >
      {/* Background Emerald Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-[#00C875]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl bg-gradient-to-b from-[#171B18] to-[#101310] border-2 border-[#00C875]/40 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          
          {/* Top Brand Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#171B18]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#050706] border border-[#00C875]/50 flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-[#00C875] rounded-xs rotate-45" />
              </div>
              <span className="font-heading font-bold text-sm tracking-wider text-[#F4F7F5]">
                MARK AUREL × SNAPSELL ACADEMY
              </span>
            </div>

            {/* 3 System Badges */}
            <div className="flex items-center gap-3 text-xs text-[#99A49F]">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#00C875]" />
                <span className="hidden sm:inline">KI-Chat</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00C875]" />
                <span className="hidden sm:inline">KI-Content</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#00C875]" />
                <span className="hidden sm:inline">SnapSell-Commerce</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Copy & Bullet points (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#050706] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase">
                DEIN NÄCHSTER SCHRITT
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05]">
                BEREIT, NICHT LÄNGER ALLES ALLEINE ZU MACHEN?
              </h2>

              <p className="text-base sm:text-lg text-[#99A49F] leading-relaxed">
                Werde Teil von Mark Aurels SnapSell Academy und baue dein Creator-Business auf rund um:
              </p>

              {/* Bullet list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#F4F7F5]">
                    <CheckCircle2 className="w-4 h-4 text-[#00C875] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleCta('MARKS ACADEMY BEITRETEN')}
                  className="px-8 py-4 bg-[#00C875] text-[#050706] font-heading font-bold text-sm tracking-wider uppercase rounded-full shadow-lg shadow-[#00C875]/30 hover:bg-[#24E68A] hover:shadow-xl hover:shadow-[#00C875]/50 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>MARKS ACADEMY BEITRETEN</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleCta('JETZT BEWERBEN')}
                  className="px-7 py-4 bg-[#050706] hover:bg-[#101310] text-[#F4F7F5] border border-[#171B18] hover:border-[#00C875]/40 font-heading font-semibold text-sm tracking-wide rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  JETZT BEWERBEN
                </button>
              </div>

              {/* Final Statement */}
              <div className="pt-4 text-xs font-heading font-semibold tracking-wider text-[#00C875] uppercase">
                Mehr kreieren. Routinearbeiten automatisieren. Direkt verkaufen. Echte Freiheit aufbauen.
              </div>
            </div>

            {/* Right: Closing Visual Composition of Mark & Creators (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#171B18] bg-[#050706] shadow-2xl relative group">
                <img
                  src="https://res.cloudinary.com/n5nqkpmk/image/upload/v1789686459/magnific_use-mark-reference-image-_w4AFxKc7EI_rjeg73.png"
                  alt="Mark Aurel – SnapSell Academy Mentor und Botschafter"
                  className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-102 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent opacity-85" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#050706]/85 backdrop-blur-md border border-[#171B18] text-center">
                  <div className="text-xs font-heading font-bold text-[#F4F7F5]">
                    Mark Aurel × SnapSell Academy
                  </div>
                  <div className="text-[10px] text-[#99A49F]">
                    Bewerbungsbasierte Creator-Community
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
