import React, { useState } from 'react';
import { Camera, Clapperboard, Sparkles, Sliders, CheckCircle2, SplitSquareVertical } from 'lucide-react';

export const ProfessionalProductionsSection: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const creativeRoles = [
    'Erfahrene Fotografen',
    'Filmemacher & Kameraleute (DoP)',
    'Creative Directors & Storyboarder',
    'Styling- & Garderoben-Teams',
    'Produktions- & Postproduktions-Experten'
  ];

  return (
    <section
      id="productions"
      className="relative py-24 sm:py-32 bg-[#050706] border-t border-[#171B18] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-4">
            <Camera className="w-3.5 h-3.5 text-[#00C875]" />
            PREMIUM-CONTENT-PRODUKTION
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-6">
            ARBEITE MIT ERFAHRENEN CREATIVES
          </h2>

          <p className="text-base sm:text-lg text-[#99A49F] mb-6 leading-relaxed">
            Ausgewählte Creator erhalten die Möglichkeit, Content mit erfahrenen internationalen Creatives zu produzieren:
          </p>

          <div className="flex flex-wrap gap-2.5 mb-6">
            {creativeRoles.map((role, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-[#101310] border border-[#171B18] text-xs text-[#F4F7F5] font-medium flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C875]" />
                {role}
              </span>
            ))}
          </div>

          <p className="text-sm font-semibold text-[#00C875] uppercase tracking-wider">
            Baue ein erstklassiges Portfolio auf, das deine Identität stärkt und deine persönliche Marke unverwechselbar macht.
          </p>
        </div>

        {/* Interactive Split Screen: Production Process vs Polished Final Campaign */}
        <div className="rounded-3xl bg-[#101310] border border-[#171B18] p-6 sm:p-10 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#171B18] gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#00C875]">
                Blick hinter die Kulissen
              </span>
              <h3 className="font-heading text-xl font-bold text-[#F4F7F5]">
                Vom Licht-Setup & Storyboard zur fertigen Kampagne
              </h3>
            </div>

            {/* Slider Range Controller */}
            <div className="flex items-center gap-3 bg-[#171B18] px-4 py-2 rounded-xl">
              <span className="text-[11px] text-[#99A49F] whitespace-nowrap">Set-Aufbau</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-28 sm:w-40 accent-[#00C875] cursor-pointer"
                aria-label="Vergleich zwischen Set-Aufbau und fertiger visueller Kampagne einstellen"
              />
              <span className="text-[11px] text-[#00C875] font-semibold whitespace-nowrap">Finale Kampagne</span>
            </div>
          </div>

          {/* Interactive Split-Visual Container */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] border border-[#171B18] select-none">
            
            {/* Background: After (Final Campaign Image) */}
            <img
              src="https://res.cloudinary.com/n5nqkpmk/image/upload/v1789686763/ChatGPT_Image_Sep_18_2026_04_10_10_AM_jfkipr.png"
              alt="Nachher – Fertiges, poliertes Kampagnenbild mit cinematischem Licht und luxuriöser Ästhetik"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-[#050706]/85 backdrop-blur-md border border-[#00C875]/40 text-xs font-bold text-[#00C875] uppercase">
              Nachher • Finale Kampagne
            </div>

            {/* Foreground: Before (Production Process - Clipped according to sliderPosition) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="https://res.cloudinary.com/n5nqkpmk/image/upload/v1789686768/ChatGPT_Image_Sep_18_2026_04_12_18_AM_bhh94d.png"
                alt="Vorher – Studio-Set und Beleuchtungs-Setup während der Produktion"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#050706]/85 backdrop-blur-md border border-[#171B18] text-xs font-bold text-[#F4F7F5] uppercase">
                Vorher • Set-Aufbau
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#00C875] pointer-events-none z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#00C875] text-[#050706] flex items-center justify-center shadow-lg shadow-[#00C875]/40">
                <Sliders className="w-4 h-4" />
              </div>
            </div>

          </div>

          {/* Steps Description Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 text-xs">
            <div className="p-3 rounded-xl bg-[#050706] border border-[#171B18]">
              <div className="text-[#00C875] font-bold mb-1">01. Storyboard</div>
              <p className="text-[#99A49F]">Konzept-Framing & Moodboards</p>
            </div>
            <div className="p-3 rounded-xl bg-[#050706] border border-[#171B18]">
              <div className="text-[#00C875] font-bold mb-1">02. Styling</div>
              <p className="text-[#99A49F]">Redaktionelle Garderobe & Texturen</p>
            </div>
            <div className="p-3 rounded-xl bg-[#050706] border border-[#171B18]">
              <div className="text-[#00C875] font-bold mb-1">03. Cinema Lighting</div>
              <p className="text-[#99A49F]">Sanfte Führungslichter, Kantenlicht & Kontrast</p>
            </div>
            <div className="p-3 rounded-xl bg-[#050706] border border-[#171B18]">
              <div className="text-[#00C875] font-bold mb-1">04. Regie</div>
              <p className="text-[#99A49F]">Marks On-Camera-Coaching</p>
            </div>
            <div className="p-3 rounded-xl bg-[#050706] border border-[#171B18] col-span-2 md:col-span-1">
              <div className="text-[#00C875] font-bold mb-1">05. Color Master</div>
              <p className="text-[#99A49F]">4K-Grading & digitaler Master-Schnitt</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
