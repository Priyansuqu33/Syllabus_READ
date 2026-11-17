import React, { useEffect, useRef, useState } from 'react';

interface RevealSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  ...rest
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately show if already in or above viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.95) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.04, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
};
