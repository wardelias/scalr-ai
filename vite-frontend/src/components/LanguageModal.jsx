import React, { useEffect } from 'react';
import { useLanguage } from '../utils/LanguageContext';

export default function LanguageModal() {
  const { isModalOpen, setIsModalOpen, setLanguage, closeModal } = useLanguage();

  if (!isModalOpen) return null;

  const handleSelect = (lang) => {
    setLanguage(lang);
    closeModal();
  };

  return (
    <div className="lang-modal-overlay" style={{ display: 'flex' }}>
      <div className="lang-modal glass-panel">
        <h2 style={{ marginBottom: '8px' }}>Select Your Language</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
          Choose your preferred viewing language.
        </p>

        <div className="lang-buttons">
          <button className="btn-primary lang-btn-main" onClick={() => handleSelect('en')}>
            <span style={{ fontSize: '24px', marginBottom: '4px' }}>🇺🇸</span>
            English (Main)
          </button>
          
          <div className="lang-secondary">
            <button className="btn-secondary lang-btn" onClick={() => handleSelect('he')}>
              <span style={{ marginRight: '8px' }}>🇮🇱</span> עברית
            </button>
            <button className="btn-secondary lang-btn" onClick={() => handleSelect('ar')}>
              <span style={{ marginRight: '8px' }}>🇦🇪</span> العربية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
