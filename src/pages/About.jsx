import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import useScrollReveal from '../utils/useScrollReveal';

export default function About() {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState(null);
  const revealRef = useScrollReveal();

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div id="about" ref={revealRef}>
      <section className="how-it-works">
        <div className="container">
          <div className="section-header text-center fade-up">
            <h2>{t('hiw_h2')}</h2>
          </div>

          <div className="timeline">
            <div className="timeline-item fade-up stagger-1">
              <div className="timeline-marker">1</div>
              <div className="timeline-content glass-panel">
                <h3>{t('hiw_1_h')}</h3>
                <p>{t('hiw_1_p')}</p>
              </div>
            </div>
            <div className="timeline-item fade-up stagger-2">
              <div className="timeline-marker">2</div>
              <div className="timeline-content glass-panel">
                <h3>{t('hiw_2_h')}</h3>
                <p>{t('hiw_2_p')}</p>
              </div>
            </div>
            <div className="timeline-item fade-up stagger-3">
              <div className="timeline-marker">3</div>
              <div className="timeline-content glass-panel">
                <h3>{t('hiw_3_h')}</h3>
                <p>{t('hiw_3_p')}</p>
              </div>
            </div>
            <div className="timeline-item fade-up stagger-4">
              <div className="timeline-marker">4</div>
              <div className="timeline-content glass-panel completed">
                <h3>{t('hiw_4_h')}</h3>
                <p>{t('hiw_4_p')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container container-small">
          <div className="section-header text-center fade-up">
            <h2>{t('faq_h2')}</h2>
          </div>

          <div className="faq-container fade-up stagger-1">
            {[1, 2, 3, 4, 5, 6].map((num, i) => (
              <div key={num} className={`faq-item glass-panel ${activeFaq === i ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(i)}>
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
