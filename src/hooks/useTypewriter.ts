"use client";

import { useState, useEffect } from "react";

/**
 * 텍스트를 한 글자씩 타이핑하는 효과를 제공하는 훅.
 * @param text - 타이핑할 전체 문자열
 * @param speedMs - 글자당 타이핑 간격(ms), 기본값 150
 * @returns 현재까지 타이핑된 문자열
 */
export function useTypewriter(text: string, speedMs = 150): string {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      setTyped(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speedMs);
    return () => clearInterval(id);
  }, [text, speedMs]);

  return typed;
}
