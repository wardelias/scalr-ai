import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Apply language settings (dir, title, etc)
  const applyLanguageSettings = (lang) => {
    document.documentElement.lang = lang;
    if (lang === 'he' || lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl-mode');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl-mode');
    }
    
    const trans = translations[lang];
    if (trans && trans.meta_title) {
        document.title = trans.meta_title;
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('scalr_lang');
    if (savedLang) {
      setCurrentLang(savedLang);
      applyLanguageSettings(savedLang);
    } else {
      setIsModalOpen(true);
      document.body.classList.add('modal-open');
      // Apply default LTR for the modal itself
      applyLanguageSettings('en');
    }
  }, []);

  const setLanguage = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('scalr_lang', lang);
    applyLanguageSettings(lang);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('modal-open');
  };

  const t = (key) => {
    return translations[currentLang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t, isModalOpen, setIsModalOpen, closeModal }}>
      {children}
    </LanguageContext.Provider>
  );
};
