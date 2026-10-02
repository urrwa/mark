import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import german from "./de.json";

export type Language = "en" | "de";
const storageKey = "mark-language";
const translations: Record<string, string> = german;
const descriptions = {
  en: "Personal creator support from Mark Aurel. Positioning, content production, and community building, powered by SnapSell technology.",
  de: "Persönliche Creator-Begleitung durch Mark Aurel. Positionierung, Content-Produktion und Community-Aufbau – unterstützt durch SnapSell-Technologie.",
};

function initialLanguage(): Language {
  const requested = new URLSearchParams(window.location.search).get("lang");
  if (requested === "en" || requested === "de") return requested;
  try {
    return localStorage.getItem(storageKey) === "de" ? "de" : "en";
  } catch {
    return "en";
  }
}

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  useEffect(() => {
    document.documentElement.lang = language;
    document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]')
      .forEach((meta) => meta.setAttribute("content", descriptions[language]));
    try { localStorage.setItem(storageKey, language); } catch { /* Optional storage. */ }
  }, [language]);
  const changeLanguage = (next: Language) => {
    setLanguage(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(window.history.state, "", url);
  };
  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: changeLanguage,
      t: (text) => language === "de" ? translations[text] ?? text : text,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is missing");
  return context;
}

export function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className="language-switch" role="group" aria-label={t("Choose language")}>
      <button type="button" lang="en" aria-label="English" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
      <button type="button" lang="de" aria-label="Deutsch" aria-pressed={language === "de"} onClick={() => setLanguage("de")}>DE</button>
    </div>
  );
}
