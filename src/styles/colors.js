// src/styles/colors.js
/**
 * Centralized color palette for Tailwind and CSS variables.
 * Single source of truth for raw hex values. Exposed to Tailwind via
 * `tailwind.config.js` and mapped to semantic CSS variables in `tokens.css`.
 */
module.exports = {
  bg: "#111827",
  light: "#374151",
  dark: "#1f2937",
  textLight: "#d1d5db",
  textDark: "#22c55e", // terminal green
  terminal: "#22c55e",
  onAccent: "#111827", // accent(초록) 배경 위의 전경색
  error: "#f87171", // 다크 배경 위 오류
};
