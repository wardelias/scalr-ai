import React from 'react';
// Link import removed for single-page layout
import { useLanguage } from '../utils/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-copyright">
            <p>&copy; <span>{t('f_cpy')}</span></p>
          </div>
          <div className="footer-links">
            <a href="#solutions">{t('nav_solutions')}</a>
            <a href="#pricing">{t('nav_pricing')}</a>
            <a href="#about">{t('nav_about')}</a>
            <a href="#book">{t('f_contact')}</a>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="WhatsApp">WA</a>
            <a href="#" aria-label="LinkedIn">IN</a>
            <a href="#" aria-label="Instagram">IG</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('f_bot')}</p>
        </div>
      </div>
    </footer>
  );
}
