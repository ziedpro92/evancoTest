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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  // Restore saved language from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('starlinq-language') as Language;
      if (saved === 'fr' || saved === 'en') {
        setLanguageState(saved);
      }
    } catch {
      // Ignore storage errors (Safari private mode, etc.)
    }
  }, []);

  // Persist language choice
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('starlinq-language', lang);
    } catch {
      // Ignore storage errors
    }
  };

  const content = language === 'fr' ? frContent : enContent;
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
