import React, { useEffect, useState, useRef } from 'react';
import './Logo.css';

const FULL_TEXT = 'Scalr';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

export default function Logo() {
  const [display, setDisplay] = useState('');
  const [dotVisible, setDotVisible] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    let charIndex = 0;
    let scrambleCount = 0;
    const totalScrambles = 4;

    const scramble = () => {
      scrambleCount++;
      const revealed = FULL_TEXT.slice(0, charIndex);
      const scrambled = CHARS[Math.floor(Math.random() * CHARS.length)];
      setDisplay(revealed + scrambled);

      if (scrambleCount >= totalScrambles) {
        clearInterval(intervalRef.current);
        const finalRevealed = FULL_TEXT.slice(0, charIndex + 1);
        setDisplay(finalRevealed);
        charIndex++;
        scrambleCount = 0;

        if (charIndex < FULL_TEXT.length) {
          intervalRef.current = setInterval(scramble, 60);
        } else {
          // All letters revealed — show dot, then start periodic glitch
          setTimeout(() => setDotVisible(true), 200);
          startPeriodicGlitch();
        }
      }
    };

    // Brief startup delay then begin
    setTimeout(() => {
      intervalRef.current = setInterval(scramble, 60);
    }, 300);

    return () => clearInterval(intervalRef.current);
  }, []);

  const startPeriodicGlitch = () => {
    const glitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    };
    // Glitch every 4–8 seconds
    const schedule = () => {
      const delay = 4000 + Math.random() * 4000;
      setTimeout(() => { glitch(); schedule(); }, delay);
    };
    schedule();
  };

  return (
    <div className={`digital-logo${glitchActive ? ' glitch' : ''}`} data-text={display}>
      <span className="digital-logo-text">{display || '\u00A0'}</span>
      <span className={`digital-logo-dot${dotVisible ? ' visible' : ''}`} />
    </div>
  );
}
