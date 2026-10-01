import React, { useState } from 'react';
import { Globe, ArrowRight, ArrowUpRight, Compass, ShieldAlert, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { DESTINATIONS, trackEvent } from '../data/academyData';

export const GlobalOpportunitiesSection: React.FC = () => {
  const [currentDestIndex, setCurrentDestIndex] = useState<number>(0);

  const perks = [
    'Internationale Creator-Reisen',
    'Cinematische Destination-Shoots',
    'Erstklassige Produktionslocations',
    'Creator-Events & Panels',
    'Professionelle Kollaborationen',
    'Globale Networking-Möglichkeiten'
  ];

  const handleNext = () => {
    setCurrentDestIndex((prev) => (prev + 1) % DESTINATIONS.length);
    trackEvent('Destination Carousel Next', { destination: DESTINATIONS[(currentDestIndex + 1) % DESTINATIONS.length].name });
  };

  const handlePrev = () => {
    setCurrentDestIndex((prev) => (prev - 1 + DESTINATIONS.length) % DESTINATIONS.length);
    trackEvent('Destination Carousel Prev', { destination: DESTINATIONS[(currentDestIndex - 1 + DESTINATIONS.length) % DESTINATIONS.length].name });
  };

  const handleCta = () => {
    trackEvent('International Opportunity Click', { source: 'global_opportunities_section' });
    const el = document.getElementById('apply');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentDest = DESTINATIONS[currentDestIndex];

  return (
    <section
      id="opportunities"
      className="relative py-24 sm:py-32 bg-[#101310] border-t border-[#171B18] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-4">
            <Globe className="w-3.5 h-3.5 text-[#00C875]" />
            INTERNATIONALE MÖGLICHKEITEN
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-6">
            REISE UM DIE WELT.<br />
            <span className="text-[#00C875]">PRODUZIERE AN CINEMATISCHEN ORTEN.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#99A49F] mb-6 leading-relaxed">
            Baue deine Marke auf, während du professionellen Content und unvergessliche internationale Erlebnisse kreierst.
            Ausgewählte Academy-Mitglieder erhalten Zugang zu kuratierten internationalen Kampagnen.
          </p>

          <div className="p-3.5 rounded-xl bg-[#050706] border border-[#171B18] text-xs sm:text-sm text-[#F4F7F5] mb-6">
            <span className="text-[#00C875] font-semibold">Ausgewählte Reiseziele:</span> Mögliche Ziele sind unter anderem Dubai, Zypern, Ibiza und weitere internationale Schauplätze, abhängig von der jeweiligen Produktion.
          </div>

          {/* Access Points Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#99A49F] bg-[#171B18]/60 p-2.5 rounded-lg border border-[#171B18]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C875]" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cinematic Destination Carousel */}
        <div className="rounded-3xl bg-[#050706] border border-[#171B18] overflow-hidden shadow-2xl relative mb-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left: Destination Imagery (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px]">
              <img
                src={currentDest.image}
                alt={currentDest.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050706] hidden lg:block opacity-90" />

              {/* Tag on Image */}
              <div className="absolute top-4 left-4 p-2 rounded-lg bg-[#050706]/80 backdrop-blur-md border border-[#171B18] text-xs font-semibold text-[#F4F7F5] flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-[#00C875]" />
                Cinematische Filmkulisse
              </div>

              {/* Destination Name Overlay (Mobile) */}
              <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                <span className="text-[10px] font-bold text-[#00C875] uppercase tracking-wider">
                  {currentDest.tagline}
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#F4F7F5]">
                  {currentDest.name}
                </h3>
              </div>
            </div>

            {/* Right: Destination Details & Navigation (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#00C875]">
                    Reiseziel {currentDestIndex + 1} von {DESTINATIONS.length}
                  </span>
                  
                  {/* Carousel Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="p-2 rounded-full bg-[#171B18] hover:bg-[#101310] text-[#F4F7F5] border border-[#171B18] transition-colors cursor-pointer"
                      aria-label="Vorheriges Reiseziel"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="p-2 rounded-full bg-[#171B18] hover:bg-[#101310] text-[#F4F7F5] border border-[#171B18] transition-colors cursor-pointer"
                      aria-label="Nächstes Reiseziel"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block mb-2 text-xs font-semibold text-[#00C875] uppercase tracking-wider">
                  {currentDest.tagline}
                </div>

                <h3 className="hidden lg:block font-heading text-3xl font-bold text-[#F4F7F5] mb-4">
                  {currentDest.name}
                </h3>

                <p className="text-sm text-[#99A49F] leading-relaxed mb-6">
                  {currentDest.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-[#171B18] text-xs">
                  <div>
                    <span className="text-[#99A49F] block mb-0.5">Atmosphäre & Kulisse:</span>
                    <span className="text-[#F4F7F5] font-medium">{currentDest.atmosphere}</span>
                  </div>
                  <div>
                    <span className="text-[#99A49F] block mb-0.5">Produktionsfokus:</span>
                    <span className="text-[#00C875] font-medium">{currentDest.productionFocus}</span>
                  </div>
                </div>
              </div>

              {/* Destination Switcher Dots */}
              <div className="pt-6 flex items-center gap-2">
                {DESTINATIONS.map((d, i) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setCurrentDestIndex(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentDestIndex === i ? 'w-8 bg-[#00C875]' : 'w-2 bg-[#171B18] hover:bg-[#99A49F]'
                    }`}
                    aria-label={`Zu ${d.name} springen`}
                  />
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* CTA & Required Legal Condition Disclosure */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#050706] border border-[#171B18]">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-heading font-bold text-[#F4F7F5]">
              Bereit für internationale Creator-Produktionen?
            </div>
            {/* Required Disclosure permanently visible */}
            <p className="text-xs text-[#99A49F] max-w-xl">
              <strong className="text-[#F4F7F5]">Wichtiger Hinweis:</strong> Reise- und Produktionsmöglichkeiten hängen von der Bewerberauswahl, Kampagnenanforderungen, Verfügbarkeit und separat vereinbarten Bedingungen ab.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCta}
            className="shrink-0 px-7 py-3.5 bg-[#00C875] text-[#050706] font-heading font-bold text-xs uppercase tracking-wider rounded-full shadow-md hover:bg-[#24E68A] transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>CREATOR-CHANCEN ENTDECKEN</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
