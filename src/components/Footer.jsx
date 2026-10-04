import React from 'react';
// Link import removed for single-page layout
import { useLanguage } from '../utils/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-copyright">
            <p>&copy; <span>{t('f_cpy')}</span></p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <a href="#services">{t('nav_services')}</a>
            <a href="#results">{t('nav_results')}</a>
            <a href="#process">{t('nav_process')}</a>
            <a href="#book">{t('f_contact')}</a>
          </nav>
          <div className="footer-social">
            <a href="https://wa.me/972544799652" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a>
            <a href={t('f_insta_link')} target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
          </div>
        </div>
        <div className="footer-bottom">
          <LanguageSwitcher className="footer-lang" />
          <p>{t('f_bot')}</p>
        </div>
      </div>
    </footer>
  );
}
