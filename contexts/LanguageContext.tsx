'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { siteContent as frContent } from '@/data/fr/content';
import { siteContent as enContent } from '@/data/en/content';
import { uiContent as frUi } from '@/data/fr/dataUi';
import { uiContent as enUi } from '@/data/en/dataUi';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: typeof frContent;
  ui: typeof frUi;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** Shallow-merge override object into base content (arrays replace entirely) */
function applyOverrides(base: any, overrides: any): any {
  if (!overrides || typeof overrides !== 'object') return base;
  const result = { ...base };
  for (const key of Object.keys(overrides)) {
    const ov = overrides[key];
    if (ov === null || ov === undefined) continue;
    if (Array.isArray(ov)) {
      result[key] = ov; // arrays replace entirely
    } else if (typeof ov === 'object' && typeof base[key] === 'object' && !Array.isArray(base[key])) {
      result[key] = { ...base[key], ...ov };
    } else if (ov !== '') {
      result[key] = ov;
    }
  }
  return result;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [overrides, setOverrides] = useState<{ fr: any; en: any }>({ fr: {}, en: {} });

  // Restore saved language
  useEffect(() => {
    try {
      const saved = localStorage.getItem('starlinq-language') as Language;
      if (saved === 'fr' || saved === 'en') setLanguageState(saved);
    } catch {}
  }, []);

  // Load content overrides from admin dashboard edits
  useEffect(() => {
    const load = () => {
      try {
        const fr = localStorage.getItem('starlinq_override_fr');
        const en = localStorage.getItem('starlinq_override_en');
        setOverrides({ fr: fr ? JSON.parse(fr) : {}, en: en ? JSON.parse(en) : {} });
      } catch {}
    };
    load();
    // Re-apply when admin saves in another tab
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem('starlinq-language', lang); } catch {}
  };

  const baseContent = language === 'fr' ? frContent : enContent;
  const content = applyOverrides(baseContent, overrides[language]) as typeof frContent;
  const ui = language === 'fr' ? frUi : enUi;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content, ui }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
