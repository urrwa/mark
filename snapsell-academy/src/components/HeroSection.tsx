import React from 'react';
import { ArrowUpRight, ChevronDown, Sparkles, MessageSquare, Image as ImageIcon, ShoppingBag, Shield } from 'lucide-react';
import { trackEvent } from '../data/academyData';

export const HeroSection: React.FC = () => {
  const handlePrimaryCta = () => {
    trackEvent('Hero CTA Click', { type: 'primary', label: 'JOIN THE ACADEMY' });
    const el = document.getElementById('apply');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSecondaryCta = () => {
    trackEvent('See How It Works Click', { source: 'hero' });
    const el = document.getElementById('system');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-32 md:pb-24 flex flex-col justify-between overflow-hidden bg-[#050706]"
    >
      {/* Background Architectural Atmosphere & Emerald Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00C875]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#00C875]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Grid / Texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#F4F7F5_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Strong Editorial Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00C875] animate-pulse" />
              MARK AUREL × SNAPSELL ACADEMY
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F7F5] leading-[0.98] mb-6">
              MEHR ERREICHEN.<br />
              <span className="text-[#00C875]">WENIGER ARBEITEN.</span><br />
              GRÖSSER LEBEN.
            </h1>

            {/* Supporting copy */}
            <p className="font-body text-base sm:text-lg text-[#99A49F] max-w-xl leading-relaxed mb-8">
              Tritt Mark Aurels SnapSell Academy bei und baue ein Creator-Business auf, angetrieben durch
              KI, Direktverkäufe und professionellen Branchen-Support.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={handlePrimaryCta}
                className="group relative px-8 py-4 bg-[#00C875] text-[#050706] font-heading font-bold text-sm tracking-wider uppercase rounded-full shadow-lg shadow-[#00C875]/25 hover:shadow-xl hover:shadow-[#00C875]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>DER ACADEMY BEITRETEN</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={handleSecondaryCta}
                className="px-7 py-4 bg-[#171B18] hover:bg-[#101310] text-[#F4F7F5] border border-[#171B18] hover:border-[#00C875]/40 font-heading font-semibold text-sm tracking-wide rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                SO FUNKTIONIERT ES
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-6 border-t border-[#171B18] w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#101310] border border-[#171B18] flex items-center justify-center text-[#00C875]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#F4F7F5]">KI-Chat-Support</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#101310] border border-[#171B18] flex items-center justify-center text-[#00C875]">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#F4F7F5]">KI-Content-Erstellung</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#101310] border border-[#171B18] flex items-center justify-center text-[#00C875]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#F4F7F5]">Direktverkäufe mit SnapSell</span>
                </div>
              </div>

              {/* Small qualification line */}
              <div className="flex items-center gap-2 mt-4 text-xs text-[#99A49F]">
                <Shield className="w-3.5 h-3.5 text-[#00C875]" />
                <span>Für Creator, Models, Performer und ambitionierte Creator-Teams.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dominant Mark Focal Point + Refined Floating Edge Interfaces (5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Visual Framing Container */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-[340px] xl:max-w-[380px]">
              
              {/* Central Mark Aurel Representation Card */}
              <div className="relative rounded-2xl overflow-hidden border border-[#171B18] bg-[#101310] shadow-2xl group">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/n5nqkpmk/image/upload/v1789684199/magnific_use-the-attached-referenc_vQrcIAsa47_jf6lvt.png"
                    alt="Mark Aurel – Creator, Performer und SnapSell Academy Guide"
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-102 transition-transform duration-700"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle cinematic gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-[#050706]/20 to-transparent opacity-85 pointer-events-none" />
                  
                  {/* Identification Tag - Compact and close to bottom edge to leave portrait details clear */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 px-2.5 rounded-lg bg-[#050706]/85 backdrop-blur-md border border-[#171B18]/80 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-heading font-bold text-[#F4F7F5] leading-none mb-0.5">MARK AUREL</div>
                      <div className="text-[9px] text-[#00C875] tracking-wider uppercase font-semibold leading-none">
                        SnapSell-Botschafter & Academy Guide
                      </div>
                    </div>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-[#171B18] text-[#99A49F] border border-[#171B18] shrink-0">
                      Verifizierter Creator
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Floating Interface 1: AI Chat Support - Near upper-left outer edge */}
              <div className="hidden lg:block lg:absolute lg:top-4 lg:-left-8 xl:-left-12 z-20 w-[175px] bg-[#101310]/85 backdrop-blur-md border border-[#171B18] hover:border-[#00C875]/30 rounded-xl p-2.5 shadow-lg shadow-black/40 transition-all duration-200">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C875] shrink-0" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#99A49F] whitespace-nowrap">KI-Chat-Support</span>
                </div>
                <div className="bg-[#050706]/75 rounded-lg p-1.5 text-[10px] text-[#F4F7F5] border border-[#171B18]/70 leading-snug space-y-0.5">
                  <p className="text-[9px] text-[#99A49F] truncate">Käufer: „Wo gibt es das ganze Set?“</p>
                  <p className="text-[#00C875] font-medium text-[9px] truncate">„Privater Link auf SnapSell ⚡“</p>
                </div>
              </div>

              {/* Desktop Floating Interface 2: AI Content Engine - Near upper-right outer edge */}
              <div className="hidden lg:block lg:absolute lg:top-6 lg:-right-8 xl:-right-12 z-20 w-[165px] bg-[#101310]/85 backdrop-blur-md border border-[#171B18] hover:border-[#00C875]/30 rounded-xl p-2.5 shadow-lg shadow-black/40 transition-all duration-200">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3 h-3 text-[#00C875] shrink-0" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#99A49F] whitespace-nowrap">KI-Content-Engine</span>
                </div>
                <div className="bg-[#050706]/75 rounded-lg p-1.5 text-[10px] text-[#F4F7F5] border border-[#171B18]/70 flex items-center justify-between">
                  <span className="text-[9px] text-[#99A49F]">1 Porträt</span>
                  <span className="text-[#00C875] font-bold text-[9px]">→ 5 Formate</span>
                </div>
              </div>

              {/* Desktop Floating Interface 3: SnapSell Checkout - Aligned near lower-right outer edge */}
              <div className="hidden lg:block lg:absolute lg:bottom-6 lg:-right-8 xl:-right-12 z-20 w-[180px] bg-[#101310]/85 backdrop-blur-md border border-[#171B18] hover:border-[#00C875]/30 rounded-xl p-2.5 shadow-lg shadow-black/40 transition-all duration-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#00C875] whitespace-nowrap">SnapSell-Checkout</span>
                  <span className="text-[8px] text-[#99A49F] uppercase tracking-wider">Sofort</span>
                </div>
                <div className="bg-[#050706]/75 rounded-lg p-1.5 border border-[#171B18]/70 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-[#00C875]/20 flex items-center justify-center text-[#00C875] font-bold text-[10px] shrink-0">
                      $
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-[#F4F7F5] leading-none whitespace-nowrap">Direkter Paylink</div>
                      <div className="text-[8px] text-[#99A49F] leading-none mt-0.5 whitespace-nowrap">Ohne Zwischenhändler</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#00C875] whitespace-nowrap">$49</span>
                </div>
              </div>

            </div>

            {/* Mobile/Tablet Stacked Interface Cards (Positioned cleanly below the portrait to keep the model's face and portrait fully unobstructed) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 lg:hidden w-full max-w-sm sm:max-w-md">
              {/* Card 1 */}
              <div className="bg-[#101310]/80 backdrop-blur-md border border-[#171B18] rounded-xl p-2.5 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C875] shrink-0" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#99A49F] whitespace-nowrap">KI-Chat-Support</span>
                </div>
                <div className="bg-[#050706]/75 rounded-lg p-1.5 text-[10px] text-[#F4F7F5] border border-[#171B18]/70 space-y-0.5">
                  <p className="text-[9px] text-[#99A49F] truncate">Käufer: „Wo gibt es das ganze Set?“</p>
                  <p className="text-[#00C875] font-medium text-[9px] truncate">„Privater Link auf SnapSell ⚡“</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#101310]/80 backdrop-blur-md border border-[#171B18] rounded-xl p-2.5 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3 h-3 text-[#00C875] shrink-0" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#99A49F] whitespace-nowrap">KI-Content-Engine</span>
                </div>
                <div className="bg-[#050706]/75 rounded-lg p-1.5 text-[10px] text-[#F4F7F5] border border-[#171B18]/70 flex items-center justify-between">
                  <span className="text-[9px] text-[#99A49F]">1 Porträt</span>
                  <span className="text-[#00C875] font-bold text-[9px]">→ 5 Formate</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#101310]/80 backdrop-blur-md border border-[#171B18] rounded-xl p-2.5 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#00C875] whitespace-nowrap">SnapSell-Checkout</span>
                  <span className="text-[8px] text-[#99A49F] uppercase tracking-wider">Sofort</span>
                </div>
                <div className="bg-[#050706]/75 rounded-lg p-1.5 border border-[#171B18]/70 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-[#00C875]/20 flex items-center justify-center text-[#00C875] font-bold text-[10px] shrink-0">
                      $
                    </div>
                    <span className="text-[9px] font-bold text-[#F4F7F5] whitespace-nowrap">Direkter Paylink</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#00C875] whitespace-nowrap">$49</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8">
        <a
          href="#problem"
          className="group flex flex-col items-center text-xs text-[#99A49F] hover:text-[#00C875] transition-colors"
          aria-label="Zu Abschnitt 2 scrollen: Die Creator-Realität"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold mb-1 opacity-70 group-hover:opacity-100">
            Nach unten scrollen
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#00C875]" />
        </a>
      </div>
    </section>
  );
};
