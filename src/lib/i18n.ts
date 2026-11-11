import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';

/**
 * Translations. Add a language: create `src/locales/<code>.json` with the same keys,
 * add it to `resources` below, and list it in `supportedLocales` for expo-localization in app.json.
 * Use in components: `const { t } = useTranslation(); t('settings.title')`.
 */
export const resources = {
  en: { translation: en },
} as const;

const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';

const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage in resources ? deviceLanguage : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
