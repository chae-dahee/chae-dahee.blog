"use client";

import { useEffect, useRef, useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;

      if (copiedTimerRef.current !== null) {
        clearTimeout(copiedTimerRef.current);
        copiedTimerRef.current = null;
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      if (!isMountedRef.current) {
        return;
      }

      if (copiedTimerRef.current !== null) {
        clearTimeout(copiedTimerRef.current);
      }

      setCopied(true);
      copiedTimerRef.current = setTimeout(() => {
        setCopied(false);
        copiedTimerRef.current = null;
      }, 2000);
    } catch {
      // 클립보드 접근이 차단된 환경에서는 무시
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-muted)] text-[var(--color-secondary)] hover:bg-[var(--color-muted)] transition-colors"
    >
      {copied ? (
        <>
          <svg
            className="w-4 h-4 mr-1.5 md:w-5 md:h-5 md:mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          링크 복사됨
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4 mr-1.5 md:w-5 md:h-5 md:mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          공유하기
        </>
      )}
    </button>
  );
}
