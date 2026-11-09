"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
};

// 클릭 기록은 링크 이동을 막지 않도록 백그라운드로 보냅니다.
function recordClick(id: string) {
  const body = JSON.stringify({ id });
  try {
    if (navigator.sendBeacon?.("/api/clicks", new Blob([body], { type: "application/json" }))) return;
  } catch {}
  fetch("/api/clicks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function LinkCard({ link }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(link.id)}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-500"
    >
      <div className="min-w-0">
        <p className="truncate font-semibold">{link.title}</p>
        {link.description && (
          <p className="mt-0.5 truncate text-sm text-stone-500 dark:text-stone-400">{link.description}</p>
        )}
      </div>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5 shrink-0 text-stone-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-500 dark:text-stone-600"
      >
        <path
          fillRule="evenodd"
          d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.17 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
}
