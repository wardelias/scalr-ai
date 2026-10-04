import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { useModal } from '../utils/ModalContext';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { LANGUAGES } from '../utils/translations';

const LINKS = [
  { id: 'method', label: 'nav_method' },
  { id: 'services', label: 'nav_services' },
  { id: 'results', label: 'nav_results' },
  { id: 'process', label: 'nav_process' },
];

export default function Navbar() {
  const { t, lang } = useLanguage();
  const { openDemoModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu on Escape or a tap outside the navbar
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    const onPointer = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [mobileMenuOpen]);

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
        window.history.pushState(null, '', LANGUAGES[lang].path);
    }
  };

  return (
    <nav className={`navbar ${isScrolled || mobileMenuOpen ? 'scrolled' : ''}`} id="navbar" ref={navRef} aria-label="Main">
      <div className="nav-container">
        <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="nav-logo" aria-label="Scalr">
          <Logo />
        </a>

        <div className={`nav-links${mobileMenuOpen ? ' open' : ''}`} id="nav-links">
          {LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={(e) => scrollToSection(e, link.id)}>{t(link.label)}</a>
          ))}
          <LanguageSwitcher className="nav-lang" />
        </div>

        <a href="#book" onClick={(e) => { e.preventDefault(); openDemoModal(); setMobileMenuOpen(false); }} className="btn-primary nav-cta">
          {t('nav_book')}
        </a>

        <button
          className={`mobile-menu-btn${mobileMenuOpen ? ' open' : ''}`}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="nav-links"
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
