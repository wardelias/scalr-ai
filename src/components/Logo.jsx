import React from 'react';
import { BRAND } from '../utils/translations';
import './Logo.css';

export default function Logo() {
  return (
    <div className="logo-mark">
      <span className="logo-dot-prefix" aria-hidden="true" />
      <span className="logo-text">{BRAND}</span>
    </div>
  );
}
