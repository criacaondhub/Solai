import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  ease = 'power2.out',
  splitType = 'chars',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'left',
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useGSAP(() => {
    if (!inView) return;

    const elements = containerRef.current?.querySelectorAll('.split-item');
    if (!elements || elements.length === 0) return;

    // Determine delay in seconds. If > 10, assume milliseconds.
    const delaySeconds = delay > 10 ? delay / 1000 : delay;

    gsap.fromTo(
      elements,
      from,
      {
        ...to,
        duration,
        ease,
        delay: delaySeconds,
        stagger: 0.03, // Default stagger
        onComplete: onLetterAnimationComplete,
      }
    );
  }, [inView, from, to, duration, ease, delay, onLetterAnimationComplete]);

  // Splitting Logic
  const words = text.split(' ');

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ textAlign, display: 'inline-block' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {splitType === 'chars'
            ? word.split('').map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="split-item"
                  style={{ display: 'inline-block', opacity: 0 }} // Initial hidden state to prevent flash
                >
                  {char}
                </span>
              ))
            : (
                <span
                    className="split-item"
                    style={{ display: 'inline-block', opacity: 0 }}
                >
                    {word}
                </span>
            )
          }
          {/* Add space after word unless it's the last one */}
          {wordIndex < words.length - 1 && (
            <span style={{ display: 'inline-block' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default SplitText;
