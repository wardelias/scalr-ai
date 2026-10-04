import React from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { LANGUAGES } from '../utils/translations';

// Plain links (not a dropdown) so search engines and AI crawlers can follow them to each language
export default function LanguageSwitcher({ className = '' }) {
  const { lang, t } = useLanguage();

  // Keep the visitor on the same section when switching language
  const keepSection = (e) => {
    e.currentTarget.href = e.currentTarget.pathname + window.location.hash;
  };

  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t('lang_label')}>
      {Object.entries(LANGUAGES).map(([code, info]) => (
        <a
          key={code}
          href={info.path}
          hrefLang={code}
          lang={code}
          className={code === lang ? 'active' : ''}
          aria-current={code === lang ? 'page' : undefined}
          onClick={keepSection}
        >
          {info.label}
        </a>
      ))}
    </div>
  );
}
