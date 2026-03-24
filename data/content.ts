/**
 * data/content.ts
 * ──────────────────────────────────────────────────────────
 * Re-exports French content as default fallback.
 * All components should use useLanguage() from contexts/LanguageContext
 * for proper FR/EN switching. This file is kept as a safe fallback.
 */
export { siteContent } from './fr/content';
