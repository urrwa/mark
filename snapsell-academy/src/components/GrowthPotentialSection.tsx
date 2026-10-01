import React, { useState } from 'react';
import { TrendingUp, CheckCircle2, ShieldAlert, BarChart3, Clock, ArrowUpRight, Zap } from 'lucide-react';
import { trackEvent } from '../data/academyData';

export const GrowthPotentialSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('consistency');

  const drivers = [
    'Eine unverwechselbare Creator-Identität',
    'Konsistenterer Premium-Content',
    'Schnellere Konversationen mit Interessenten',
    'Professionelle digitale Angebote',
    'Direkte SnapSell-Verkäufe',
    'Upsells und Produkt-Bundles',
    'Wiederkehrende Käufer',
    'Creator-Kollaborationen',
    'Internationale Chancen'
  ];

  const categories = [
    {
      id: 'consistency',
      title: 'Content-Konsistenz',
      metric: 'Skalierbare Veröffentlichungsfrequenz',
      description: 'KI-gestützte Produktion sorgt für ästhetischen Output auf Reels und Stories, ohne deine kreative Energie zu verbrennen.',
      trend: [20, 35, 45, 60, 80, 95]
    },
    {
      id: 'conversations',
      title: 'Chats & Anfragen',
      metric: 'Sofortige Reaktionszeit',
      description: 'Der KI-Chat reagiert unmittelbar auf eingehendes Interesse, hält die Kaufabsicht hoch und qualifiziert VIP-Kunden vor.',
      trend: [15, 30, 50, 70, 85, 100]
    },
    {
      id: 'offers',
      title: 'Veröffentlichte Angebote & Bundles',
      metric: 'Diversifizierter Produktkatalog',
      description: 'Digitale Kollektionen mit Einmalkauf, gestaffelte Master-Sets und direkte Paylinks – sicher gehostet auf SnapSell.',
      trend: [10, 25, 40, 55, 75, 90]
    },
    {
      id: 'purchases',
      title: 'Erfolgreiche Käufe',
      metric: 'Reibungslose Conversion',
      description: '1-Klick-Paylinks umgehen Abo-Müdigkeit, senken die Absprungrate und maximieren das Checkout-Tempo.',
      trend: [25, 40, 55, 70, 85, 95]
    },
    {
      id: 'retention',
      title: 'Wiederkehrende Käufer & LTV',
      metric: 'Wachsender Kundenstamm',
      description: 'Follow-up-Sequenzen reaktivieren bestehende Käufer für zukünftige Releases und steigern den Customer Lifetime Value.',
      trend: [10, 20, 35, 55, 75, 90]
    }
  ];

  const currentCat = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section
      id="growth"
      className="relative py-24 sm:py-32 bg-[#101310] border-t border-[#171B18] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-[#00C875]" />
            AUF SKALIERUNG AUSGERICHTET
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-6">
            EBNE DEINEN WEG ZU 20.000 $ PRO MONAT
          </h2>

          <p className="text-base sm:text-lg text-[#99A49F] mb-6 leading-relaxed">
            Marks Academy hilft Creatorn dabei, die Systeme aufzubauen, die für ambitionierte Umsatzziele erforderlich sind.
          </p>

          <div className="p-4 rounded-xl bg-[#050706] border border-[#00C875]/40 text-[#00C875] font-heading font-bold text-xs sm:text-sm tracking-wide uppercase mb-8">
            BAUE EIN CREATOR-BUSINESS AUF, DAS ÜBER DEINE PERSÖNLICHE ARBEITSZEIT HINAUS WÄCHST.
          </div>
        </div>

        {/* Growth Drivers Grid (9 points) */}
        <div className="mb-16">
          <div className="text-xs uppercase font-bold tracking-widest text-[#99A49F] mb-4">
            Zentrale Wachstumshebel
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {drivers.map((driver, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#050706] border border-[#171B18] flex items-center gap-3 text-xs text-[#F4F7F5]"
              >
                <div className="w-5 h-5 rounded-full bg-[#171B18] border border-[#00C875]/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-[#00C875]" />
                </div>
                <span className="font-medium">{driver}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Elegant Growth Dashboard (Abstract, No Fabricated Balances) */}
        <div className="rounded-3xl bg-[#050706] border border-[#171B18] p-6 sm:p-10 mb-8 shadow-2xl relative">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#171B18] gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#00C875]">
                <Zap className="w-3.5 h-3.5" />
                <span>Beispielhaftes Wachstums-Framework</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F4F7F5] mt-1">
                Systemische Beschleunigung in allen Schlüsselbereichen
              </h3>
            </div>

            <div className="text-xs text-[#99A49F] bg-[#171B18] px-3 py-1.5 rounded-full border border-[#171B18]">
              Qualitative Systemarchitektur
            </div>
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  trackEvent('Growth Category Clicked', { category: cat.title });
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#00C875] text-[#050706] shadow-md shadow-[#00C875]/20'
                    : 'bg-[#171B18] text-[#99A49F] hover:text-[#F4F7F5] border border-[#171B18]'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Dashboard Visual Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Dimension Details (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-[#00C875] uppercase tracking-wider">
                  Fokusbereich
                </span>
                <h4 className="font-heading text-2xl font-bold text-[#F4F7F5] mt-1">
                  {currentCat.title}
                </h4>
              </div>

              <div className="p-4 rounded-xl bg-[#101310] border border-[#171B18]">
                <span className="text-xs text-[#99A49F] block mb-1">Zielergebnis:</span>
                <span className="text-base font-bold text-[#00C875]">{currentCat.metric}</span>
              </div>

              <p className="text-sm text-[#99A49F] leading-relaxed">
                {currentCat.description}
              </p>
            </div>

            {/* Right: Abstract Curve Visualization (7 cols) */}
            <div className="lg:col-span-7 bg-[#101310] rounded-2xl p-6 border border-[#171B18]">
              <div className="flex items-center justify-between text-xs text-[#99A49F] mb-6">
                <span>Phase 01: Einrichtung</span>
                <span>Phase 02: Start</span>
                <span>Phase 03: Skalierung</span>
              </div>

              {/* Abstract Bar / SVG Chart with Emerald Highlights */}
              <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-[#171B18]">
                {currentCat.trend.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#171B18] to-[#00C875] transition-all duration-500 group-hover:to-[#24E68A]"
                      style={{ height: `${val}%` }}
                    />
                    <span className="text-[9px] font-mono text-[#99A49F]">T+{idx + 1}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#99A49F] pt-4">
                <span>Illustration: System-Dynamik im Zeitverlauf</span>
                <span className="text-[#00C875] font-semibold">Zunehmende Effizienz</span>
              </div>
            </div>

          </div>

        </div>

        {/* Required Disclaimer Permanently Visible */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#050706] border border-[#171B18] flex items-start gap-3 text-xs text-[#99A49F] leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-[#00C875] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#F4F7F5]">Gesetzlich verpflichtender Einkommenshinweis:</strong> 20.000 $ monatlich sind ein ambitioniertes Ziel – kein Versprechen oder garantiertes Einkommen. Ergebnisse hängen von deiner Zielgruppe, Positionierung, deinem Content, Angebot, deiner Preisgestaltung, Beständigkeit, Marktnachfrage und Umsetzung ab.
          </div>
        </div>

      </div>
    </section>
  );
};
