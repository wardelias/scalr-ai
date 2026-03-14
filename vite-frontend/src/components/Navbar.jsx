import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

export default function Navbar() {
  const { currentLang, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Scalr_logo.svg/512px-Scalr_logo.svg.png"
            alt="scalr.ai"
            style={{ height: '36px' }}
          />
        </Link>
        
        <div className="nav-links" style={{ display: mobileMenuOpen ? 'flex' : '' }}>
          <Link to="/solutions" onClick={() => setMobileMenuOpen(false)}>{t('nav_solutions')}</Link>
          <Link to="/use-cases" onClick={() => setMobileMenuOpen(false)}>{t('nav_use_cases')}</Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>{t('nav_pricing')}</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>{t('nav_about')}</Link>

          {/* Navbar lang switcher */}
          <div className="nav-lang-switcher">
            <select
              id="nav-lang-select"
              className="nav-lang-select"
              value={currentLang}
              onChange={handleLangChange}
            >
              <option value="en">EN</option>
              <option value="he">HE</option>
              <option value="ar">AR</option>
            </select>
          </div>
        </div>

        <Link to="/book" className="btn-primary nav-cta">
          {t('nav_book')}
        </Link>

        <button
          className="mobile-menu-btn"
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
