import { useEffect, useRef } from 'react';

/**
 * Reusable scroll-reveal hook.
 * Attach the returned ref to a wrapper element — any `.fade-up` children
 * will be revealed when they scroll into view.
 */
export default function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    const elements = root.querySelectorAll('.fade-up');

    // Force-reveal anything already in the viewport on mount
    const timer = setTimeout(() => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('visible');
        } else {
          observer.observe(el);
        }
      });
    }, 80);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  });

  return ref;
}
