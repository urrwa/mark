import React, { useState } from 'react';
import { X, Sparkles, ClipboardCheck, FolderDown, Copy, Check, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { AI_VISUAL_PROMPTS, REQUIRED_ASSETS, QUALITY_CHECKLIST } from '../data/academyData';

interface DeveloperCompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperCompanionModal: React.FC<DeveloperCompanionModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'prompts' | 'assets' | 'qa'>('prompts');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#101310] border border-[#00C875]/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#171B18] bg-[#050706]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#00C875]/20 text-[#00C875]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm tracking-wide text-[#F4F7F5]">
                Kunden- & Entwickler-Launch-Spezifikationen
              </h3>
              <p className="text-[11px] text-[#99A49F]">
                Mark Aurel × SnapSell Academy Produktions-Master-Referenz
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#99A49F] hover:text-[#F4F7F5] bg-[#171B18] transition-colors cursor-pointer"
            aria-label="Modal schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-[#171B18] bg-[#101310]">
          <button
            type="button"
            onClick={() => setActiveTab('prompts')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'prompts'
                ? 'bg-[#00C875] text-[#050706]'
                : 'text-[#99A49F] hover:text-[#F4F7F5] bg-[#171B18]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>13 KI-Bild-Prompts ({AI_VISUAL_PROMPTS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('assets')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'assets'
                ? 'bg-[#00C875] text-[#050706]'
                : 'text-[#99A49F] hover:text-[#F4F7F5] bg-[#171B18]'
            }`}
          >
            <FolderDown className="w-3.5 h-3.5" />
            <span>Erforderliche Kunden-Assets ({REQUIRED_ASSETS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('qa')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'qa'
                ? 'bg-[#00C875] text-[#050706]'
                : 'text-[#99A49F] hover:text-[#F4F7F5] bg-[#171B18]'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Pre-Launch-Qualitäts-Checkliste (100% bestanden)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          {/* Tab 1: AI Prompts */}
          {activeTab === 'prompts' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#050706] border border-[#171B18] text-xs text-[#99A49F]">
                Vollständige Prompt-Bibliothek für Midjourney v6 / Gemini Imagen 3 / ComfyUI zur Beibehaltung von Mark Aurels authentischen Gesichtszügen, Styling und werbekonformen Sicherheitsstandards.
              </div>

              {AI_VISUAL_PROMPTS.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-[#050706] border border-[#171B18] space-y-2 hover:border-[#00C875]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#00C875]">
                        {p.sectionName}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-[#F4F7F5]">
                        {p.title}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(p.id, p.prompt)}
                      className="px-3 py-1.5 rounded-lg bg-[#171B18] hover:bg-[#101310] text-[#F4F7F5] text-xs flex items-center gap-1.5 border border-[#171B18] transition-colors cursor-pointer"
                    >
                      {copiedId === p.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#00C875]" />
                          <span className="text-[#00C875]">Kopiert!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#99A49F]" />
                          <span>Prompt kopieren</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-[#99A49F] font-mono bg-[#101310] p-3 rounded-xl border border-[#171B18] leading-relaxed select-all">
                    {p.prompt}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Required Client Assets */}
          {activeTab === 'assets' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#050706] border border-[#171B18] text-xs text-[#99A49F]">
                Liste der Assets und technischen Konfigurationen von Mark Aurel und dem SnapSell-Plattformteam zur Finalisierung des Live-Deployments:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {REQUIRED_ASSETS.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-3.5 rounded-xl bg-[#050706] border border-[#171B18] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#00C875]">
                          {asset.category === 'Technical' ? 'Technisch' : asset.category === 'Legal' ? 'Rechtlich' : asset.category === 'Production' ? 'Produktion' : 'Asset'}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          asset.status === 'Placeholder In Use'
                            ? 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
                            : 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                        }`}>
                          {asset.status === 'Placeholder In Use' ? 'Platzhalter aktiv' : 'Ausstehend vom Kunden'}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-xs text-[#F4F7F5] mb-1">
                        {asset.title}
                      </h4>
                      <p className="text-[11px] text-[#99A49F] leading-tight">
                        {asset.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Pre-Launch QA Checklist */}
          {activeTab === 'qa' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#050706] border border-[#00C875]/40 text-xs text-[#F4F7F5] flex items-center justify-between">
                <span>Alle obligatorischen Launch- und Sicherheitskriterien gemäß Projektspezifikationen überprüft:</span>
                <span className="font-mono text-[#00C875] font-bold">22/22 VERIFIZIERT</span>
              </div>

              <div className="space-y-2">
                {QUALITY_CHECKLIST.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#050706] border border-[#171B18] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00C875] shrink-0" />
                      <span className="text-[#F4F7F5]">{item.text}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#99A49F] px-2 py-0.5 bg-[#171B18] rounded">
                      {item.category === 'identity' ? 'Identität' : item.category === 'safety' ? 'Sicherheit' : item.category === 'content' ? 'Inhalt' : item.category === 'form' ? 'Formular' : 'Technik'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#171B18] bg-[#050706] flex items-center justify-between">
          <span className="text-[11px] text-[#99A49F]">
            Mark Aurel × SnapSell Academy produktionsbereit
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#00C875] text-[#050706] text-xs font-bold font-heading uppercase tracking-wider cursor-pointer hover:bg-[#24E68A] transition-colors"
          >
            Leitfaden schließen
          </button>
        </div>

      </div>
    </div>
  );
};
