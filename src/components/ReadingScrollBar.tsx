import React, { useEffect, useState } from 'react';

interface ReadingScrollBarProps {
  visible: boolean;
}

export const ReadingScrollBar: React.FC<ReadingScrollBarProps> = ({ visible }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      setProgress(0);
      return;
    }

    let rafId = 0;
    const updateProgress = () => {
      rafId = 0;
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }
      const ratio = Math.min(1, Math.max(0, scrollTop / maxScroll));
      setProgress(ratio);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-16 left-0 right-0 h-[3px] z-30 bg-[var(--border-hairline)]/40 pointer-events-none"
    >
      <div
        className="h-full bg-[var(--accent-primary)] origin-left will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};
