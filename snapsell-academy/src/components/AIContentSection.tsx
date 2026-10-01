import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Film, Image as ImageIcon, Globe, FileText, CheckCircle2, Play, Eye } from 'lucide-react';

export const AIContentSection: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<number>(0);

  const formats = [
    {
      id: 'lifestyle',
      title: 'Cineastische Lifestyle-Fotografie',
      type: 'Still Editorial',
      ratio: '4:5 Porträt',
      desc: 'Kontrastreiche Studio- und Architektur-Beleuchtung, die Gesichtszüge, natürliche Hautporen und Styling exakt bewahrt.',
      image: 'https://res.cloudinary.com/n5nqkpmk/image/upload/v1789684641/images_2_euxtdy.jpg',
      badge: 'Identitätsgeschütztes Editorial'
    },
    {
      id: 'reel',
      title: 'Vertikale Videos & Reels',
      type: 'Motion Clip',
      ratio: '9:16 Video',
      desc: 'Dynamisches Pacing, cineastische Tiefenschärfe und native Reel-Übergänge für maximale algorithmische Reichweite.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85',
      badge: 'Vertikale Motion'
    },
    {
      id: 'story',
      title: 'Instagram- & Snap-Stories',
      type: 'Ephemere Story',
      ratio: '9:16 Story',
      desc: 'Behind-the-Scenes-Ästhetik, Day-in-the-Life-Einblicke und interaktive Engagement-Elemente für direkte SnapSell-Links.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
      badge: 'Tägliches Engagement'
    },
    {
      id: 'talking',
      title: 'Talking-Head-Videos & Updates',
      type: 'Synchronisierte Stimme',
      ratio: '16:9 / 9:16',
      desc: 'Präzise Lippensynchronisation für Ankündigungen, Mitglieder-Begrüßungen und personalisierte Produkt-Teaser.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
      badge: 'Natürliche Kadenz'
    },
    {
      id: 'campaign',
      title: 'Hochwertige Werbekampagne',
      type: 'Banner & Master Visual',
      ratio: '16:9 Querformat',
      desc: 'Internationales Kampagnen-Visual, ideal für digitale Billboards, exklusive Mitglieder-Banner und Agentur-Pitches.',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=85',
      badge: 'Kommerzieller Master'
    }
  ];

  return (
    <section
      id="ai-content"
      className="relative py-24 sm:py-32 bg-[#101310] border-t border-[#171B18] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00C875]" />
            SÄULE ZWEI
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-6">
            MEHR ERSTELLEN, OHNE JEDEN TAG ZU DREHEN
          </h2>

          <div className="inline-block p-3 rounded-xl bg-[#050706] border border-[#00C875]/40 text-[#00C875] font-heading font-bold text-xs sm:text-sm tracking-wide uppercase mb-6">
            SICHTBAR UND KONSISTENT BLEIBEN, OHNE JEDEN POST MANUELL ZU PRODUZIEREN.
          </div>

          <p className="text-base sm:text-lg text-[#99A49F] leading-relaxed">
            Verwandle deine freigegebene Identität und deinen kreativen Stil in einen kontinuierlichen Strom erstklassiger Assets:
          </p>
        </div>

        {/* 6 Core Output Categories Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          {[
            { label: 'Realistische KI-Fotos', icon: ImageIcon },
            { label: 'Kurzvideos & Reels', icon: Film },
            { label: 'Lifestyle & Reisen', icon: Globe },
            { label: 'Talking-Head-Videos', icon: Play },
            { label: 'Skripte & Captions', icon: FileText },
            { label: 'Mehrsprachiger Content', icon: Globe }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#171B18] border border-[#171B18] flex flex-col items-center text-center gap-2"
              >
                <Icon className="w-4 h-4 text-[#00C875]" />
                <span className="text-xs font-semibold text-[#F4F7F5]">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* The Transformation Engine: 1 Approved Portrait -> 5 Coordinated Outputs */}
        <div className="rounded-3xl bg-[#050706] border border-[#171B18] p-6 sm:p-10 relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-8 mb-8 border-b border-[#171B18] gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-heading font-bold text-[#00C875] uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-4 h-4" />
                Ethisches Identitäts-Protokoll
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F4F7F5]">
                1 freigegebenes Master-Porträt → 5 Produktions-Outputs
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-xs text-[#99A49F]">
              <ShieldCheck className="w-4 h-4 text-[#00C875]" />
              <span>Volle Creator-Einwilligung & Identitätsverifizierung garantiert</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Step 1: The Single Approved Reference Portrait (4 cols) */}
            <div className="lg:col-span-4">
              <div className="p-4 rounded-2xl bg-[#101310] border border-[#171B18]">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-heading font-bold text-[#F4F7F5] uppercase tracking-wider">
                    Schritt 01: Verifizierter Input
                  </span>
                  <span className="text-[10px] bg-[#00C875]/20 text-[#00C875] px-2 py-0.5 rounded-full font-semibold">
                    Freigegebene Referenz
                  </span>
                </div>

                <div className="aspect-[3/4] rounded-xl overflow-hidden relative border border-[#171B18]">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85"
                    alt="Einzelne freigegebene Creator-Porträtreferenz"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3 p-2 bg-[#050706]/85 backdrop-blur-md rounded-lg text-[11px] text-[#99A49F] border border-[#171B18]">
                    Natürliche Gesichtstopologie, Knochenstruktur und Markenästhetik geschützt.
                  </div>
                </div>

                <div className="mt-3 text-center text-xs text-[#99A49F]">
                  Kein unbefugtes Klonen • Strikter Identitätsschutz
                </div>
              </div>
            </div>

            {/* Step 2: The Multi-Format Outputs Showcase (8 cols) */}
            <div className="lg:col-span-8">
              
              {/* Format Switcher Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
                {formats.map((fmt, idx) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedFormat === idx
                        ? 'bg-[#00C875] text-[#050706] shadow-md shadow-[#00C875]/20'
                        : 'bg-[#171B18] text-[#99A49F] hover:text-[#F4F7F5] border border-[#171B18]'
                    }`}
                  >
                    {fmt.title}
                  </button>
                ))}
              </div>

              {/* Active Format Display */}
              <div className="p-6 rounded-2xl bg-[#101310] border border-[#171B18] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative border border-[#00C875]/30 group">
                  <img
                    src={formats[selectedFormat].image}
                    alt={formats[selectedFormat].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#050706]/80 backdrop-blur-md border border-[#171B18] text-[10px] font-bold text-[#00C875] uppercase">
                    {formats[selectedFormat].badge}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#00C875]">
                      Generiertes Format • {formats[selectedFormat].ratio}
                    </span>
                    <h4 className="font-heading text-xl font-bold text-[#F4F7F5] mt-1">
                      {formats[selectedFormat].title}
                    </h4>
                  </div>

                  <p className="text-sm text-[#99A49F] leading-relaxed">
                    {formats[selectedFormat].desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#171B18]">
                    <div className="flex items-center justify-between text-xs text-[#99A49F]">
                      <span>Auflösung</span>
                      <span className="text-[#F4F7F5] font-mono">4K Master UHD</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#99A49F]">
                      <span>Durchlaufzeit</span>
                      <span className="text-[#00C875] font-semibold">Sofortige Generierung</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#99A49F]">
                      <span>Mehrsprachige Synchronisation</span>
                      <span className="text-[#F4F7F5]">Deutsch, Englisch, Spanisch +</span>
                    </div>
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
