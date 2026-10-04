import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import useScrollReveal from '../utils/useScrollReveal';

export default function Process() {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState(null);
  const revealRef = useScrollReveal();

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div id="process" ref={revealRef}>
      <section className="how-it-works">
        <div className="container">
          <div className="section-header text-center fade-up">
            <span className="section-label">{t('hiw_label')}</span>
            <h2>{t('hiw_h2')}</h2>
          </div>

          <div className="timeline">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className={`timeline-item fade-up stagger-${num}`}>
                <div className="timeline-marker">{num}</div>
                <div className={`timeline-content glass-panel${num === 4 ? ' completed' : ''}`}>
                  <h3>{t(`hiw_${num}_h`)}</h3>
                  <p>{t(`hiw_${num}_p`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="container container-small">
          <div className="section-header text-center fade-up">
            <h2>{t('faq_h2')}</h2>
          </div>

          <div className="faq-container fade-up stagger-1">
            {[1, 2, 3, 4, 5, 6].map((num, i) => (
              <div key={num} className={`faq-item glass-panel ${activeFaq === i ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(i)} aria-expanded={activeFaq === i}>
                  <span>{t(`faq_${num}_q`)}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>{t(`faq_${num}_a`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
