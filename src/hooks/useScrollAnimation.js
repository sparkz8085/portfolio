import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Also animate project cards if this is a projects section
          const projectCards = entry.target.querySelectorAll('.project-card');
          projectCards.forEach((card) => {
            setTimeout(() => {
              card.classList.add('animate-in');
            }, 50);
          });
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
};
