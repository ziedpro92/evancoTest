'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative flex items-center gap-1" title="Select language">
      <Globe className="h-4 w-4 text-gray-500" />

      <button
        onClick={() => setLanguage('fr')}
        className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
          language === 'fr'
            ? 'bg-PRIMARY text-white'
            : 'text-gray-600 hover:text-PRIMARY'
        }`}
        aria-label="Français"
      >
        FR
      </button>

      <span className="text-gray-300 text-xs">|</span>

      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
          language === 'en'
            ? 'bg-PRIMARY text-white'
            : 'text-gray-600 hover:text-PRIMARY'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
