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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = root.querySelectorAll('.fade-up');
    
    // Use an observer for everything
    elements.forEach(el => observer.observe(el));

    // Force-reveal anything already mostly in view
    const checkImmediate = () => {
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('visible');
                observer.unobserve(el);
            }
        });
    };

    const timer = setTimeout(checkImmediate, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []); // Run once on mount

  return ref;
}
