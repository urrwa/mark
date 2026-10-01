import React from 'react';
import { ArrowUpRight, ShieldCheck, Instagram, Mail, Globe, Sparkles } from 'lucide-react';
import { trackEvent } from '../data/academyData';

interface FooterSectionProps {
  onOpenLegalModal: (tab: 'imprint' | 'privacy' | 'terms' | 'creator' | 'advertising' | 'eighteen') => void;
  onOpenCookieSettings: () => void;
  onOpenCompanion?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenLegalModal,
  onOpenCookieSettings,
  onOpenCompanion
}) => {
  const handleSocialClick = (platform: string, url: string) => {
    trackEvent('Footer Link Clicked', { platform, url });
  };

  return (
    <footer className="bg-[#050706] border-t border-[#171B18] pt-16 pb-12 text-xs text-[#99A49F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#171B18]">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#101310] border border-[#00C875]/40 flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-[#00C875] rounded-xs rotate-45" />
              </div>
              <span className="font-heading font-bold text-base text-[#F4F7F5] tracking-tight">
                MARK AUREL × SNAPSELL ACADEMY
              </span>
            </div>

            <p className="text-xs text-[#99A49F] max-w-sm leading-relaxed">
              Eine erstklassige Creator-Academy, die ambitionierten Creatorn dabei hilft, stärkere persönliche Marken aufzubauen,
              Content mit KI zu produzieren, repetitive Konversationen zu automatisieren und digitale Inhalte direkt über SnapSell zu verkaufen.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#00C875]">
              <ShieldCheck className="w-4 h-4" />
              <span>18+ Verifiziertes Creator-Programm • Zugang nur auf Bewerbung</span>
            </div>
          </div>

          {/* Socials & Verified Links (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs uppercase font-bold tracking-widest text-[#F4F7F5]">
              Offizielle Kanäle & Verifikation
            </div>
            
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.instagram.com/mark_aurel.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('Mark Aurel Instagram', 'https://www.instagram.com/mark_aurel.official')}
                  className="flex items-center gap-2 text-[#F4F7F5] hover:text-[#00C875] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#00C875]" />
                  <span>Instagram: @mark_aurel.official</span>
                  <ArrowUpRight className="w-3 h-3 text-[#99A49F]" />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/snapsell_24"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('SnapSell Instagram', 'https://www.instagram.com/snapsell_24')}
                  className="flex items-center gap-2 text-[#F4F7F5] hover:text-[#00C875] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#00C875]" />
                  <span>SnapSell Instagram: @snapsell_24</span>
                  <ArrowUpRight className="w-3 h-3 text-[#99A49F]" />
                </a>
              </li>

              <li className="flex items-center gap-2 text-[#99A49F]">
                <Globe className="w-3.5 h-3.5 text-[#00C875]" />
                <span>Offizielle SnapSell-Website:</span>
                <span className="text-[#F4F7F5] bg-[#171B18] px-2 py-0.5 rounded font-mono text-[10px]">
                  [VERIFIZIERTE URL ERGÄNZEN]
                </span>
              </li>

              <li className="flex items-center gap-2 text-[#99A49F]">
                <Mail className="w-3.5 h-3.5 text-[#00C875]" />
                <span>Kontakt-E-Mail:</span>
                <span className="text-[#F4F7F5] bg-[#171B18] px-2 py-0.5 rounded font-mono text-[10px]">
                  [E-MAIL ERGÄNZEN]
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Legal Links & Tooling (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs uppercase font-bold tracking-widest text-[#F4F7F5]">
              Rechtliches & Transparenz
            </div>
            
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('imprint')}
                  className="hover:text-[#00C875] transition-colors cursor-pointer"
                >
                  Impressum
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('privacy')}
                  className="hover:text-[#00C875] transition-colors cursor-pointer"
                >
                  Datenschutzerklärung
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('terms')}
                  className="hover:text-[#00C875] transition-colors cursor-pointer"
                >
                  Allgemeine Geschäftsbedingungen (AGB)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('creator')}
                  className="hover:text-[#00C875] transition-colors cursor-pointer"
                >
                  Creator-Vereinbarung
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('advertising')}
                  className="hover:text-[#00C875] transition-colors cursor-pointer"
                >
                  Werbehinweise & Kennzeichnung
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('eighteen')}
                  className="hover:text-[#00C875] transition-colors cursor-pointer"
                >
                  18+ Jugendschutzhinweis
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCookieSettings}
                  className="hover:text-[#00C875] transition-colors cursor-pointer"
                >
                  Cookie-Einstellungen
                </button>
              </li>
              {onOpenCompanion && (
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenCompanion}
                    className="inline-flex items-center gap-1.5 text-[#00C875] hover:underline font-semibold cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>KI-Prompts & Pre-Launch-Spezifikationen</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Required Footer Note Permanently Displayed */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#99A49F]">
          <p className="max-w-3xl leading-relaxed text-center md:text-left">
            Mark Aurels SnapSell Academy bietet Weiterbildung, Tools und Zugang zu ausgewählten Möglichkeiten.
            Individuelle Ergebnisse variieren. Es werden keine finanziellen Ergebnisse, Kooperationen, Produktionen oder Reisegelegenheiten garantiert.
          </p>
          <div className="whitespace-nowrap text-[#F4F7F5]">
            © {new Date().getFullYear()} Mark Aurel × SnapSell Academy. Alle Rechte vorbehalten.
          </div>
        </div>

      </div>
    </footer>
  );
};
