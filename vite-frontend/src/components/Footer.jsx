import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/solutions">{t('nav_solutions')}</Link>
            <Link to="/pricing">{t('nav_pricing')}</Link>
            <Link to="/about">{t('nav_about')}</Link>
            <Link to="/book">{t('f_contact')}</Link>
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
