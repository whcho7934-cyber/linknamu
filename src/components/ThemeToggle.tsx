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
      className="flex h-9 w-9 items-center justify-center rounded-full text-[#a0806e] transition-colors duration-300 hover:bg-white/60 hover:text-[#3b2a20] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0926a] dark:text-[#b89c8a] dark:hover:bg-white/10 dark:hover:text-[#f6ebe1]"
    >
      {/* 하이드레이션 전에는 아이콘을 비워둡니다 */}
      {isDark === null ? null : isDark ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-[18px] w-[18px]">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
        </svg>
      )}
    </button>
  );
}
