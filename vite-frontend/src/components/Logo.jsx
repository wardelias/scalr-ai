import React from 'react';
import './Logo.css';

export default function Logo() {
  const text = "Scalr";
  
  return (
    <div className="animated-logo-container">
      <span className="animated-logo-text">
        {text.split('').map((char, index) => (
          <span 
            key={index} 
            className="logo-char" 
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            {char}
          </span>
        ))}
      </span>
      <span className="animated-logo-dot"></span>
    </div>
  );
}
