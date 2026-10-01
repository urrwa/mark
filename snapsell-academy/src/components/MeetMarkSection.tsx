import React, { useState } from 'react';
import { ArrowUpRight, Camera, Film, Users, Award, Play, Pause, Sparkles } from 'lucide-react';
import { trackEvent } from '../data/academyData';

export const MeetMarkSection: React.FC = () => {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const handleStartWithMark = () => {
    trackEvent('Start With Mark Click', { source: 'meet_mark_section' });
    const el = document.getElementById('apply');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about-mark"
      className="relative py-24 sm:py-32 bg-[#050706] border-t border-[#171B18] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Portrait & Production Behind-The-Scenes (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#171B18] bg-[#101310] shadow-2xl">
              
              {/* Main Visual Frame */}
              <div className="aspect-[4/5] relative overflow-hidden group">
                <img
                  src="https://res.cloudinary.com/n5nqkpmk/image/upload/v1789684455/magnific_use-mark-reference-image-_9Z017XdNYZ_gbr3sx.png"
                  alt="Mark Aurel – Creator, Performer und SnapSell Academy Guide"
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-102 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent opacity-85" />

                {/* Behind-The-Scenes Studio Footage Toggle Simulation */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    type="button"
                    onClick={() => setIsPlayingPreview(!isPlayingPreview)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101310]/80 backdrop-blur-md border border-[#171B18] hover:border-[#00C875]/50 text-[#F4F7F5] text-xs font-medium transition-colors cursor-pointer"
                  >
                    {isPlayingPreview ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#00C875]" />
                        <span>Studio-Kamera live</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#00C875]" />
                        <span>BTS-Vorschau</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Ambient Video Overlay when preview active */}
                {isPlayingPreview && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-[#00C875]/20 border border-[#00C875] flex items-center justify-center mb-3">
                      <Film className="w-6 h-6 text-[#00C875] animate-pulse" />
                    </div>
                    <div className="text-sm font-heading font-bold text-[#F4F7F5] mb-1">
                      Mark Aurel Produktions-Showreel
                    </div>
                    <p className="text-xs text-[#99A49F] max-w-xs mb-3">
                      Hochkarätige cineastische Set-Zusammenarbeit mit Creative Directors und Creator-Kollegen.
                    </p>
                    <span className="text-[10px] text-[#00C875] uppercase tracking-wider bg-[#101310] px-2.5 py-1 rounded-full border border-[#171B18]">
                      [Client-Asset: Freigegebenes BTS-Video verknüpft]
                    </span>
                  </div>
                )}

                {/* Role badges floating over image bottom */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101310]/90 backdrop-blur-md border border-[#171B18] text-xs text-[#F4F7F5] font-medium">
                      <Camera className="w-3.5 h-3.5 text-[#00C875]" />
                      Creator
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101310]/90 backdrop-blur-md border border-[#171B18] text-xs text-[#F4F7F5] font-medium">
                      <Film className="w-3.5 h-3.5 text-[#00C875]" />
                      Performer
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101310]/90 backdrop-blur-md border border-[#171B18] text-xs text-[#F4F7F5] font-medium">
                      <Users className="w-3.5 h-3.5 text-[#00C875]" />
                      Branchen-Connector
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Editorial Biography & Quote (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-4 w-fit">
              <Award className="w-3.5 h-3.5 text-[#00C875]" />
              DEIN CREATOR-GUIDE
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-4">
              LERNE VON MARK AUREL
            </h2>

            {/* Role line */}
            <div className="font-heading text-lg sm:text-xl font-semibold text-[#00C875] tracking-wide mb-6">
              Creator. Performer. Branchen-Connector.
            </div>

            {/* Body Copy */}
            <div className="space-y-4 text-[#99A49F] font-body text-base sm:text-lg leading-relaxed mb-8">
              <p>
                Mark bringt Praxiserfahrung aus professionellen Produktionen, Live-Performances,
                Events und Kollaborationen mit Creatorn, Models und Produktionspartnern mit.
              </p>
              <p>
                Als SnapSell-Botschafter unterstützt er Creator dabei, stärkeren Content, professionelle
                Beziehungen und strukturiertere Wege zur Monetarisierung ihrer Arbeit zu entwickeln.
              </p>
            </div>

            {/* Quote Block */}
            <div className="p-6 rounded-2xl bg-[#101310] border border-[#171B18] relative mb-8">
              <div className="text-3xl font-serif text-[#00C875]/40 leading-none mb-2">“</div>
              <p className="font-heading text-lg sm:text-xl font-medium text-[#F4F7F5] italic leading-snug">
                „Ich helfe dir, deinen Content, deine Identität und dein Netzwerk in ein professionelleres Creator-Business zu verwandeln.“
              </p>
              <div className="mt-4 pt-3 border-t border-[#171B18] flex items-center justify-between text-xs text-[#99A49F]">
                <span className="font-semibold text-[#F4F7F5]">— Mark Aurel</span>
                <span className="text-[#00C875]">SnapSell-Botschafter</span>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                type="button"
                onClick={handleStartWithMark}
                className="group px-8 py-4 bg-[#00C875] text-[#050706] font-heading font-bold text-sm tracking-wider uppercase rounded-full shadow-lg shadow-[#00C875]/20 hover:shadow-xl hover:shadow-[#00C875]/35 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>MIT MARK STARTEN</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
