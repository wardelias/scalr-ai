import React, { useState, useEffect } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { useModal } from '../utils/ModalContext';
import Logo from './Logo';

export default function Navbar() {
  const { currentLang, setLanguage, t } = useLanguage();
  const { openDemoModal } = useModal();
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

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without jump
      window.history.pushState(null, '', `#${id}`);
    } else if (id === 'home') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        window.history.pushState(null, '', '/');
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#home" onClick={(e) => scrollToSection(e, 'home')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo />
        </a>
        
        <div className={`nav-links${mobileMenuOpen ? ' open' : ''}`}>
          <a href="#solutions" onClick={(e) => scrollToSection(e, 'solutions')}>{t('nav_solutions')}</a>
          <a href="#use-cases" onClick={(e) => scrollToSection(e, 'use-cases')}>{t('nav_use_cases')}</a>
          <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')}>{t('nav_pricing')}</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{t('nav_about')}</a>

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

        <a href="#book" onClick={(e) => { e.preventDefault(); openDemoModal(); setMobileMenuOpen(false); }} className="btn-primary nav-cta">
          {t('nav_book')}
        </a>

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
