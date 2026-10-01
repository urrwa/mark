import React, { useState } from 'react';
import { ShoppingBag, Upload, DollarSign, Link2, Share2, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { trackEvent } from '../data/academyData';

export const SnapSellJourneySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      stepNumber: 1,
      title: 'Lade deinen Content hoch',
      icon: Upload,
      headline: 'Sofortiger Medien-Tresor',
      description: 'Ziehe deine Fotosets, Videoarchive, BTS-Dateien oder Preset-Pakete einfach per Drag & Drop in deinen sicheren, verschlüsselten Creator-Speicher.',
      screenPreview: {
        header: 'Content hochladen',
        status: '3 Dateien hochgeladen (4,2 GB)',
        detail: 'cyprus_editorial_master.zip',
        action: 'Dateien verschlüsselt & bereit'
      }
    },
    {
      stepNumber: 2,
      title: 'Wähle deinen Preis',
      icon: DollarSign,
      headline: 'Volle Preishoheit',
      description: 'Bestimme individuelle Preise, einmalige Freischaltgebühren oder gestaffelte Bundles in USD oder EUR – ganz ohne komplizierte Abo-Hürden.',
      screenPreview: {
        header: 'Angebotspreis festlegen',
        status: '$49.00 USD',
        detail: 'Sofort-Checkout • Apple Pay & Karten',
        action: 'Dynamische Staffelung aktiv'
      }
    },
    {
      stepNumber: 3,
      title: 'Erstelle deinen Kauf-Link',
      icon: Link2,
      headline: 'Ein einziger, reibungsloser Paylink',
      description: 'SnapSell generiert einen übersichtlichen, mobiloptimierten Kauf-Link mit 1-Tap-Checkout, automatischer Steuerabwicklung und sofortiger Auslieferung an den Käufer.',
      screenPreview: {
        header: 'Generierter Paylink',
        status: 'snapsell.me/mark/cyprus-set',
        detail: '1-Klick-Checkout aktiv',
        action: 'Link kopieren'
      }
    },
    {
      stepNumber: 4,
      title: 'Teile ihn mit deiner Zielgruppe',
      icon: Share2,
      headline: 'Über jeden Kanal vertreiben',
      description: 'Platziere deinen Link in DMs, automatisierten KI-Chats, Instagram Stories, YouTube-Beschreibungen oder sende ihn direkt per privatem Messenger.',
      screenPreview: {
        header: 'Direkter Vertrieb',
        status: 'DMs • Bio • KI-Auto-Reply',
        detail: 'Keine Plattform-Drosselung',
        action: 'Tracking-Pixel aktiv'
      }
    },
    {
      stepNumber: 5,
      title: 'Zahlung erhalten & Content ausliefern',
      icon: CheckCircle2,
      headline: 'Sofortige Auszahlung & automatisierte Auslieferung',
      description: 'Der Käufer bezahlt per Karte, Apple Pay oder Google Pay. Der Content wird sofort in 4K freigeschaltet, während die Einnahmen direkt bei dir eingehen.',
      screenPreview: {
        header: 'Zahlung bestätigt',
        status: '+$49.00 direkt zur Auszahlung',
        detail: 'Automatischer 4K-Download gestartet',
        action: 'Beleg & Zugang gesendet'
      }
    }
  ];

  const handleDiscoverSnapSell = () => {
    trackEvent('SnapSell Discovery Click', { source: 'snapsell_journey_section' });
    // In production, this can open the official verified SnapSell URL
    const el = document.getElementById('apply');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="snapsell"
      className="relative py-24 sm:py-32 bg-[#050706] border-t border-[#171B18] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-4">
            <ShoppingBag className="w-3.5 h-3.5 text-[#00C875]" />
            SÄULE DREI
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-6">
            DEIN CONTENT. DEIN PREIS. EIN LINK.
          </h2>

          <div className="inline-block p-3 rounded-xl bg-[#101310] border border-[#00C875]/40 text-[#00C875] font-heading font-bold text-xs sm:text-sm tracking-wide uppercase mb-6">
            VERBINDE DEINE DIGITALEN ANGEBOTE DIREKT MIT KAUFINTERESSIERTEN FANS.
          </div>

          <p className="text-base sm:text-lg text-[#99A49F] leading-relaxed">
            SnapSell eliminiert komplizierte Plattform-Hürden. Verkaufe exklusive digitale Kollektionen, Videos
            und Mitgliedschaften mit direkten, reibungslosen Paylinks.
          </p>
        </div>

        {/* 5 Connected Mobile Screen Sequence (Desktop interactive, Mobile swipeable) */}
        <div className="mb-12">
          
          {/* Progress Indicators / Step selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => {
                    setActiveStep(idx);
                    trackEvent('SnapSell Step Selected', { step: step.stepNumber });
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#171B18] border-[#00C875] shadow-lg shadow-[#00C875]/10'
                      : 'bg-[#101310]/60 border-[#171B18] hover:border-[#00C875]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#99A49F]">
                      Schritt 0{step.stepNumber}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#00C875]' : 'text-[#99A49F]'}`} />
                  </div>
                  <div className={`text-xs font-semibold line-clamp-1 ${isActive ? 'text-[#F4F7F5]' : 'text-[#99A49F]'}`}>
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Showcase Screen */}
          <div className="p-6 sm:p-10 rounded-3xl bg-[#101310] border border-[#171B18] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Detailed Information (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#00C875] uppercase tracking-wider">
                <span>Schritt {steps[activeStep].stepNumber} von 5</span>
                <span>•</span>
                <span>{steps[activeStep].headline}</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F4F7F5]">
                {steps[activeStep].title}
              </h3>

              <p className="text-base text-[#99A49F] leading-relaxed">
                {steps[activeStep].description}
              </p>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDiscoverSnapSell}
                  className="px-6 py-3 rounded-full bg-[#00C875] text-[#050706] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#24E68A] transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>SNAPSELL ENTDECKEN</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="text-[11px] text-[#99A49F]">
                  [Verifiziertes SnapSell-Botschafter-Feature]
                </div>
              </div>
            </div>

            {/* Right: Mobile UI Screen Render for Active Step (6 cols) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[320px] rounded-[32px] border-4 border-[#171B18] bg-[#050706] p-4 shadow-xl">
                
                {/* Brand Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#171B18] mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#00C875] rounded-xs rotate-45" />
                    <span className="text-[11px] font-heading font-bold tracking-wider text-[#F4F7F5]">SNAPSELL</span>
                  </div>
                  <span className="text-[9px] text-[#00C875] font-mono">LIVE-VORSCHAU</span>
                </div>

                {/* Simulated App View */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-[#F4F7F5]">
                    {steps[activeStep].screenPreview.header}
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#171B18] border border-[#00C875]/30">
                    <div className="text-xs font-bold text-[#00C875]">
                      {steps[activeStep].screenPreview.status}
                    </div>
                    <div className="text-[11px] text-[#99A49F] mt-1">
                      {steps[activeStep].screenPreview.detail}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#101310] border border-[#171B18] flex items-center justify-between text-[11px]">
                    <span className="text-[#99A49F]">Aktionsstatus:</span>
                    <span className="text-[#F4F7F5] font-medium">{steps[activeStep].screenPreview.action}</span>
                  </div>

                  <div className="pt-2 text-center text-[10px] text-[#99A49F]">
                    Keine Weiterleitungen • Direkter verschlüsselter Checkout
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
