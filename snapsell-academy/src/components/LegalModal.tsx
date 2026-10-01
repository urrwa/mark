import React from 'react';
import { X, ShieldCheck, FileText, Scale, Eye, AlertCircle } from 'lucide-react';

export type LegalTab = 'imprint' | 'privacy' | 'terms' | 'creator' | 'advertising' | 'eighteen';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onClose: () => void;
  onSelectTab: (tab: LegalTab) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onSelectTab
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#101310] border border-[#171B18] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#171B18] bg-[#050706]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#00C875]" />
            <span className="font-heading font-bold text-sm tracking-wide text-[#F4F7F5]">
              Rechtliche Hinweise & Compliance-Dokumente
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#99A49F] hover:text-[#F4F7F5] bg-[#171B18] transition-colors cursor-pointer"
            aria-label="Dialog schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2 border-b border-[#171B18] bg-[#101310] overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'imprint', label: 'Impressum' },
            { id: 'privacy', label: 'Datenschutzerklärung' },
            { id: 'terms', label: 'AGB' },
            { id: 'creator', label: 'Creator-Vereinbarung' },
            { id: 'advertising', label: 'Werbehinweise' },
            { id: 'eighteen', label: '18+ Jugendschutz' }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTab(t.id as LegalTab)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === t.id
                  ? 'bg-[#00C875] text-[#050706]'
                  : 'text-[#99A49F] hover:text-[#F4F7F5] bg-[#171B18]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#99A49F] leading-relaxed">
          
          {activeTab === 'imprint' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#F4F7F5]">Impressum</h3>
              <p>
                <strong>Mark Aurel × SnapSell Academy</strong><br />
                Offizielle Vertretung & Botschafter-Programm<br />
                Unternehmenseinheit: Mark Aurel Management & SnapSell Partner Academy<br />
                Geschäftsadresse: [LADUNGSFÄHIGE ADRESSE ERGÄNZEN]<br />
                Offizielle Kontakt-E-Mail: [VERIFIZIERTE E-MAIL ERGÄNZEN]
              </p>
              <p>
                <strong>Verantwortlich für den Inhalt:</strong> Mark Aurel & Redaktionsteam der SnapSell Academy.
              </p>
              <p>
                <strong>Streitbeilegung:</strong> Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#F4F7F5]">Datenschutzerklärung</h3>
              <p>
                Diese Datenschutzerklärung erläutert, wie Mark Aurels SnapSell Academy personenbezogene Daten erhebt, nutzt und schützt, die über diese Website übermittelt werden.
              </p>
              <h4 className="font-heading text-sm font-bold text-[#F4F7F5]">1. Datenerhebung</h4>
              <p>
                Wenn du dich für die Academy bewirbst, erheben wir deinen Namen, deine E-Mail-Adresse, Social-Media-Profillinks, deinen Creator-Status sowie deine Präferenzen bezüglich internationaler Produktionsmöglichkeiten.
              </p>
              <h4 className="font-heading text-sm font-bold text-[#F4F7F5]">2. Zweck der Verarbeitung</h4>
              <p>
                Die Daten werden ausschließlich verarbeitet, um deine Eignung für die Academy zu prüfen, potenzielle Produktions-Shootings zu koordinieren und relevante geschäftliche Möglichkeiten zu kommunizieren.
              </p>
              <h4 className="font-heading text-sm font-bold text-[#F4F7F5]">3. Keine Weitergabe oder Verkauf von Daten</h4>
              <p>
                Wir verkaufen, vermieten oder übermitteln keine personenbezogenen Bewerberdaten an unbefugte Dritte. Alle Übertragungen erfolgen verschlüsselt.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#F4F7F5]">Allgemeine Geschäftsbedingungen (AGB)</h3>
              <p>
                Mit dem Zugriff auf diese Website oder dem Absenden einer Bewerbung an Mark Aurels SnapSell Academy erklärst du dich mit diesen Bedingungen einverstanden.
              </p>
              <h4 className="font-heading text-sm font-bold text-[#F4F7F5]">1. Zugang auf Bewerbungsbasis</h4>
              <p>
                Das Absenden einer Bewerbung garantiert weder die Aufnahme in die Academy noch die Teilnahme an bestimmten Kampagnen oder internationalen Produktionen.
              </p>
              <h4 className="font-heading text-sm font-bold text-[#F4F7F5]">2. Eigenverantwortliche Ergebnisse & keine Garantien</h4>
              <p>
                Die Academy stellt methodische Leitfäden, KI-Tools und kommerzielle Strategien bereit. Geschäftliche Resultate, finanzielle Erträge und Reichweitenwachstum hängen vollständig von deiner individuellen Umsetzung, der Zielgruppennachfrage und deiner Beständigkeit ab.
              </p>
            </div>
          )}

          {activeTab === 'creator' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#F4F7F5]">Creator-Vereinbarung & Identitätseinwilligung</h3>
              <p>
                Alle Mitglieder und Produktionsteilnehmer schließen vor der Teilnahme an Kampagnen eine verifizierte Creator-Vereinbarung ab.
              </p>
              <h4 className="font-heading text-sm font-bold text-[#F4F7F5]">1. Identitäts- & Einwilligungsprotokolle</h4>
              <p>
                Alle innerhalb der Academy bereitgestellten KI-Content-Tools arbeiten strikt auf Basis verifizierter Creator-Einwilligungen. Die unautorisierte Erstellung fremder Abbilder oder das Vortäuschen falscher Identitäten ist strengstens untersagt.
              </p>
              <h4 className="font-heading text-sm font-bold text-[#F4F7F5]">2. Produktionsstandards</h4>
              <p>
                Die Teilnahme an internationalen Shootings (Dubai, Zypern, Ibiza etc.) unterliegt gesonderten Produktionsverträgen, Sicherheitsrichtlinien und gegenseitigen Verfügbarkeitsvereinbarungen.
              </p>
            </div>
          )}

          {activeTab === 'advertising' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#F4F7F5]">Werbehinweise & Botschafter-Offenlegung</h3>
              <p>
                Mark Aurel fungiert als offizieller Botschafter für SnapSell. Bei Affiliate-Links, Plattform-Empfehlungen oder werblichen Erwähnungen können Mark und die Academy Vergütungen oder Plattform-Incentives erhalten.
              </p>
              <p>
                Alle Aussagen zu den SnapSell-Direktverkaufsfunktionen stellen dokumentierte Plattform-Features dar, die für die direkte digitale Monetarisierung von Creatorn entwickelt wurden.
              </p>
            </div>
          )}

          {activeTab === 'eighteen' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#F4F7F5]">18+ Alters- & Jugendschutzrichtlinie</h3>
              <p>
                Mark Aurels SnapSell Academy richtet sich ausschließlich an volljährige Creator, die mindestens 18 Jahre alt sind.
              </p>
              <p>
                Bewerbungen von Personen unter 18 Jahren werden ausnahmslos abgelehnt. Eine Altersverifikation und der Nachweis der vollen Geschäftsfähigkeit sind vor der Aufnahme oder der Teilnahme an Produktions-Events zwingend erforderlich.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#171B18] bg-[#050706] flex items-center justify-between">
          <span className="text-[11px] text-[#99A49F]">
            SnapSell Academy Rechtsrahmen
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#171B18] hover:bg-[#101310] text-[#F4F7F5] text-xs font-semibold cursor-pointer transition-colors"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
