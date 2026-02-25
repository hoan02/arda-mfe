import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import viTranslation from './locales/vi.json';

export type Language = 'vi' | 'en';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: { translation: enTranslation },
      vi: { translation: viTranslation },
    },
    fallbackLng: 'vi',
    debug: false,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'arda_language',
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export { i18n };

// Re-export old functions for backward compatibility where needed, 
// though updating to useTranslation is recommended.
export function getLanguage(): Language {
  return (i18n.language as Language) || 'vi';
}

export function setLanguage(lang: Language): void {
  i18n.changeLanguage(lang);
}

export function toggleLanguage(): Language {
  const next = getLanguage() === 'vi' ? 'en' : 'vi';
  setLanguage(next);
  return next;
}

export function t(key: string, lang?: Language): string {
  if (lang) {
    return i18n.getFixedT(lang)(key) as string;
  }
  return i18n.t(key) as string;
}

// Re-export react-i18next tools to be used by apps
export { I18nextProvider, useTranslation, Trans } from 'react-i18next';
