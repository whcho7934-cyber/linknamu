"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-lg shadow-sm transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-stone-800 dark:bg-stone-900"
    >
      {/* 하이드레이션 전에는 아이콘을 비워둡니다 */}
      <span aria-hidden="true">{isDark === null ? "" : isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}
