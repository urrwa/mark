import React from 'react';
import { Bell, MessageCircle, Clock, AlertCircle, Layers, CheckCircle2 } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section
      id="problem"
      className="relative py-24 sm:py-32 bg-[#101310] border-t border-[#171B18] overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00C875]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171B18] border border-[#171B18] text-[#99A49F] text-xs font-semibold tracking-wider uppercase mb-4">
            <Layers className="w-3.5 h-3.5 text-[#00C875]" />
            DIE CREATOR-REALITÄT
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-6">
            IMMER NOCH ALLES ALLEINE MANAGEN?
          </h2>
          <p className="text-base sm:text-lg text-[#99A49F] leading-relaxed">
            Der traditionelle Creator-Alltag zwingt dich dazu, zehn Rollen gleichzeitig zu übernehmen – und
            raubt dir die Energie für das, was wirklich zählt.
          </p>
        </div>

        {/* Visual Composition: Overload to Systematized Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Layered Representation of Creator Overload (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#171B18] bg-[#050706] p-6 sm:p-8">
              
              {/* Central Visual: Creator in Studio Working */}
              <div className="relative rounded-xl overflow-hidden mb-6 aspect-[16/10]">
                <img
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=85"
                  alt="Moderner Creator bei der Arbeit im dunklen Studio mit Multi-Screen-Timeline und digitalen Workflows"
                  className="w-full h-full object-cover filter contrast-105 brightness-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 text-xs font-medium text-[#99A49F]">
                  Manueller Aufwand • 24/7 Postfach-Druck
                </div>
              </div>

              {/* Layered Floating Notification Cards (Information Overload) */}
              <div className="space-y-3">
                
                {/* Notification 1 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#171B18] border border-[#171B18]/80 shadow-md transform hover:-translate-y-0.5 transition-transform">
                  <div className="p-2 rounded-lg bg-[#101310] text-[#99A49F]">
                    <MessageCircle className="w-4 h-4 text-[#D5C39B]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#F4F7F5]">47 ungelesene Käuferanfragen</span>
                      <span className="text-[#99A49F] text-[10px]">Gerade eben</span>
                    </div>
                    <p className="text-xs text-[#99A49F] truncate">
                      „Kannst du den privaten Galerie-Link senden? Möchte kaufen.“
                    </p>
                  </div>
                </div>

                {/* Notification 2 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#171B18] border border-[#171B18]/80 shadow-md transform hover:-translate-y-0.5 transition-transform">
                  <div className="p-2 rounded-lg bg-[#101310] text-[#99A49F]">
                    <Clock className="w-4 h-4 text-[#00C875]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#F4F7F5]">Content-Warteschlange ausstehend</span>
                      <span className="text-[#99A49F] text-[10px]">Vor 3 Std.</span>
                    </div>
                    <p className="text-xs text-[#99A49F] truncate">
                      5 Reels zu schneiden, 12 Stories zu planen, Bildunterschriften-Übersetzung nötig.
                    </p>
                  </div>
                </div>

                {/* Notification 3 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#171B18] border border-[#171B18]/80 shadow-md">
                  <div className="p-2 rounded-lg bg-[#101310] text-[#99A49F]">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#F4F7F5]">Lukrative Markenanfrage verpasst</span>
                      <span className="text-[#99A49F] text-[10px]">Gestern</span>
                    </div>
                    <p className="text-xs text-[#99A49F] truncate">
                      Käufer wartete 14 Stunden auf Zahlungsanweisungen und sprang ab.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right: The Breakdown Points + The Highlighted Core Statement (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#171B18]/60 border border-[#171B18]">
                <div className="w-8 h-8 rounded-lg bg-[#101310] border border-[#171B18] flex items-center justify-center text-[#99A49F] shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-[#F4F7F5] mb-1">
                    Du erstellst den Content.
                  </h4>
                  <p className="text-sm text-[#99A49F]">
                    Stundenlanges manuelles Planen, Stylen, Shooten und Bearbeiten jedes einzelnen Assets.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#171B18]/60 border border-[#171B18]">
                <div className="w-8 h-8 rounded-lg bg-[#101310] border border-[#171B18] flex items-center justify-center text-[#99A49F] shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-[#F4F7F5] mb-1">
                    Du beantwortest jede Nachricht.
                  </h4>
                  <p className="text-sm text-[#99A49F]">
                    Rund um die Uhr über verschiedene Zeitzonen hinweg an dein Smartphone gefesselt, um immer dieselben Fragen zu beantworten.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#171B18]/60 border border-[#171B18]">
                <div className="w-8 h-8 rounded-lg bg-[#101310] border border-[#171B18] flex items-center justify-center text-[#99A49F] shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-[#F4F7F5] mb-1">
                    Du verwaltest mehrere Plattformen.
                  </h4>
                  <p className="text-sm text-[#99A49F]">
                    Unterschiedliche Algorithmen, Paywalls und Vertriebskanäle jonglieren – ohne eine zentrale Schaltstelle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#171B18]/60 border border-[#171B18]">
                <div className="w-8 h-8 rounded-lg bg-[#101310] border border-[#171B18] flex items-center justify-center text-[#99A49F] shrink-0">
                  04
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-[#F4F7F5] mb-1">
                    Und wertvolle Chancen gehen trotzdem verloren.
                  </h4>
                  <p className="text-sm text-[#99A49F]">
                    Sobald Antwortzeiten sinken, entgehen dir hochpreisige digitale Käufe und Kooperationen.
                  </p>
                </div>
              </div>
            </div>

            {/* The Highlighted Statement */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#171B18] to-[#101310] border-2 border-[#00C875]/40 shadow-xl shadow-black/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C875]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 text-[#00C875] text-xs uppercase font-bold tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                Das Academy-Paradigma
              </div>
              <p className="font-heading text-xl sm:text-2xl font-bold text-[#F4F7F5] leading-snug">
                „Du musst nicht härter arbeiten. <br className="hidden sm:inline" />
                <span className="text-[#00C875]">Du brauchst ein besseres System.</span>“
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
