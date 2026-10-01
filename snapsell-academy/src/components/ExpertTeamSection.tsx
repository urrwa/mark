import React from 'react';
import { Users, CheckCheck, Briefcase, Camera, Film, Cpu, TrendingUp, Sparkles } from 'lucide-react';

export const ExpertTeamSection: React.FC = () => {
  const capabilities = [
    'Creator-Positionierung & unverwechselbare Markenidentität',
    'Content-Produktion & redaktionelle Regie',
    'Kanalstrategie & Distributionstiming',
    'KI-Chat-Einrichtung & Konversations-Feinschliff',
    'SnapSell-Produkte, Bundles & Paylink-Setup',
    'Preisstrategie & Erstellung hochpreisiger Angebote',
    'Kooperationen & strategische Creator-Partnerschaften',
    'Performance-Optimierung & Funnel-Verfeinerung'
  ];

  const teamRoles = [
    { title: 'Content-Stratege', icon: Sparkles, focus: 'Ästhetische Konsistenz & Engagement-Hooks' },
    { title: 'KI-Spezialist', icon: Cpu, focus: 'Identitätsgeschützte Prompts & Multiformat-Pipelines' },
    { title: 'Fotograf', icon: Camera, focus: 'High-End-Cinematic-Licht & redaktionelles Master-Framing' },
    { title: 'Filmemacher', icon: Film, focus: 'Pacing, Color-Grading und reichweitenstarke Reel-Cinematics' },
    { title: 'Growth-Manager', icon: TrendingUp, focus: 'SnapSell-Conversion-Funnel & Kundenbindung' }
  ];

  return (
    <section
      id="team"
      className="relative py-24 sm:py-32 bg-[#050706] border-t border-[#171B18] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Behind-The-Scenes Production Scene with Floating Role Labels (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#171B18] bg-[#101310] shadow-2xl">
              
              {/* Studio Environment Image */}
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85"
                  alt="Mark Aurel mit kreativem Produktionsteam im High-End-Studio mit Kameras und Licht-Rigs"
                  className="w-full h-full object-cover filter brightness-90 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent opacity-80" />
              </div>

              {/* Identification Tag */}
              <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-[#050706]/85 backdrop-blur-md border border-[#171B18] text-xs font-semibold text-[#F4F7F5]">
                Produktionsstudio-Umgebung • BTS
              </div>

              {/* Floating Role Labels Overlaying Image */}
              <div className="p-6 bg-[#101310] space-y-3">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#00C875] mb-2">
                  Spezialisierte Kompetenzen & Beratung
                </div>

                <div className="flex flex-wrap gap-2">
                  {teamRoles.map((role, idx) => {
                    const Icon = role.icon;
                    return (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171B18] border border-[#171B18] hover:border-[#00C875]/40 transition-colors text-xs text-[#F4F7F5]"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#00C875]" />
                        <span className="font-semibold">{role.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Support Copy & Areas (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-4 w-fit">
              <Users className="w-3.5 h-3.5 text-[#00C875]" />
              PROFESSIONELLER SUPPORT
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-4">
              DU BLEIBST DAS GESICHT.<br />
              <span className="text-[#00C875]">WIR UNTERSTÜTZEN DAS BUSINESS.</span>
            </h2>

            <div className="inline-block p-3 rounded-xl bg-[#101310] border border-[#00C875]/40 text-[#00C875] font-heading font-bold text-xs sm:text-sm tracking-wide uppercase mb-6">
              DU MUSST NICHT LÄNGER ALLES ALLEINE AUFBAUEN.
            </div>

            <p className="text-base text-[#99A49F] mb-6 leading-relaxed">
              Je nach gewähltem Programm-Level und Bewerberprofil unterstützen dich Mark Aurel und das
              professionelle Produktionsteam in allen operativen Bereichen:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#99A49F]">
                  <div className="w-4 h-4 rounded-full bg-[#171B18] border border-[#00C875]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCheck className="w-2.5 h-2.5 text-[#00C875]" />
                  </div>
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-[#99A49F] p-3 rounded-xl bg-[#101310] border border-[#171B18]">
              * Rollenbezeichnungen repräsentieren Kompetenzbereiche und dedizierte Beratungsunterstützung, die basierend auf deiner individuellen Bewerbungsprüfung zugewiesen werden.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
