import React, { createContext, useContext } from 'react';
import { translations } from './translations';

// The language is fixed per page (/ = English, /he/ = Hebrew), so it never changes at runtime
const makeValue = (lang) => ({
  lang,
  t: (key) => translations[lang]?.[key] ?? translations.en[key] ?? key,
});

const LanguageContext = createContext(makeValue('en'));

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ lang = 'en', children }) => (
  <LanguageContext.Provider value={makeValue(lang)}>
    {children}
  </LanguageContext.Provider>
);
