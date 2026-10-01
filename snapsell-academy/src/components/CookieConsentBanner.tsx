import React, { useState, useEffect } from 'react';
import { Shield, Check, Settings2, X } from 'lucide-react';
import { trackEvent } from '../data/academyData';

interface CookieConsentBannerProps {
  forceOpen?: boolean;
  onCloseSettings?: () => void;
  onOpenPrivacy?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  forceOpen = false,
  onCloseSettings,
  onOpenPrivacy
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (forceOpen) {
      setIsVisible(true);
      setShowDetails(true);
      return;
    }

    const consent = localStorage.getItem('snapsell_academy_cookie_consent');
    if (!consent) {
      // Delay slightly for smooth entering feel
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [forceOpen]);

  const handleAcceptAll = () => {
    localStorage.setItem('snapsell_academy_cookie_consent', 'all');
    setIsVisible(false);
    setShowDetails(false);
    if (onCloseSettings) onCloseSettings();
    trackEvent('Cookie Consent Accepted All');
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'snapsell_academy_cookie_consent',
      JSON.stringify({ essential: true, analytics: analyticsEnabled })
    );
    setIsVisible(false);
    setShowDetails(false);
    if (onCloseSettings) onCloseSettings();
    trackEvent('Cookie Preferences Saved', { analyticsEnabled });
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('snapsell_academy_cookie_consent', 'essential_only');
    setIsVisible(false);
    setShowDetails(false);
    if (onCloseSettings) onCloseSettings();
    trackEvent('Cookie Consent Rejected Non-Essential');
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie- und Datenschutzeinstellungen"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#101310]/95 backdrop-blur-md border border-[#171B18] rounded-2xl p-5 shadow-2xl text-xs text-[#99A49F] animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#00C875]" />
          <span className="font-heading font-bold text-sm text-[#F4F7F5]">
            Datenschutz- & Cookie-Einstellungen
          </span>
        </div>
        {forceOpen && onCloseSettings && (
          <button
            type="button"
            onClick={onCloseSettings}
            className="text-[#99A49F] hover:text-[#F4F7F5]"
            aria-label="Einstellungen schließen"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="leading-relaxed mb-3">
        Wir verwenden technisch notwendige Cookies zur Bereitstellung der Funktionen sowie datenschutzfreundliche Analysen zur Optimierung der Nutzererfahrung. Es werden keine Werbetracker Dritter eingesetzt.
      </p>

      {showDetails && (
        <div className="my-3 p-3 rounded-xl bg-[#050706] border border-[#171B18] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#F4F7F5] font-semibold">Technisch notwendige Cookies</span>
            <span className="text-[#00C875] text-[10px] font-mono uppercase">Immer aktiv</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#171B18]">
            <span className="text-[#F4F7F5] font-semibold">Analyse & Performance</span>
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              className="accent-[#00C875] cursor-pointer"
            />
          </div>
          <div className="pt-1 text-[10px] text-[#99A49F]">
            Erfahre mehr in unserer{' '}
            <button
              type="button"
              onClick={() => {
                if (onOpenPrivacy) onOpenPrivacy();
              }}
              className="text-[#00C875] underline"
            >
              Datenschutzerklärung
            </button>
            .
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-2">
        <button
          type="button"
          onClick={handleAcceptAll}
          className="flex-1 py-2 px-3 bg-[#00C875] hover:bg-[#24E68A] text-[#050706] font-heading font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
        >
          Alle akzeptieren
        </button>

        {showDetails ? (
          <button
            type="button"
            onClick={handleSavePreferences}
            className="py-2 px-3 bg-[#171B18] hover:bg-[#050706] text-[#F4F7F5] font-semibold text-xs rounded-lg border border-[#171B18] transition-colors cursor-pointer"
          >
            Einstellungen speichern
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="py-2 px-3 bg-[#171B18] hover:bg-[#050706] text-[#F4F7F5] font-semibold text-xs rounded-lg border border-[#171B18] transition-colors cursor-pointer flex items-center gap-1"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Anpassen</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleRejectNonEssential}
          className="py-2 px-3 text-[#99A49F] hover:text-[#F4F7F5] text-xs cursor-pointer"
        >
          Ablehnen
        </button>
      </div>
    </aside>
  );
};
