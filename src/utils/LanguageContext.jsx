import React, { createContext, useContext } from 'react';
import { translations } from './translations';

// The site is English-only. Copy still lives in translations.js so it stays in one place.
const t = (key) => translations.en[key] ?? key;

const LanguageContext = createContext({ t });

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => (
  <LanguageContext.Provider value={{ t }}>
    {children}
  </LanguageContext.Provider>
);
