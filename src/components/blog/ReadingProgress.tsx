"use client";

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  targetId: string;
}

export default function ReadingProgress({ targetId }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    let animationFrame: number | null = null;

    const updateProgress = () => {
      const targetTop = window.scrollY + target.getBoundingClientRect().top;
      const scrollableDistance = target.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        setProgress(window.scrollY >= targetTop ? 100 : 0);
        return;
      }

      const nextProgress = ((window.scrollY - targetTop) / scrollableDistance) * 100;
      setProgress(Math.round(Math.min(100, Math.max(0, nextProgress))));
    };

    const scheduleUpdate = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        updateProgress();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetId]);

  return (
    <div>
      <div className="flex justify-between text-xs text-[var(--color-secondary)] mb-2">
        <span>읽기 진행률</span>
        <span>{progress}%</span>
      </div>
      <div
        className="w-full bg-[var(--color-surface)] border border-[var(--color-muted)] h-2"
        role="progressbar"
        aria-label="읽기 진행률"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="bg-[var(--color-accent)] h-full transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
