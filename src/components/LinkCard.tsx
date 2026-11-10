"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  count: number;
  onClick: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="group flex min-h-[66px] items-center justify-between gap-4 rounded-[20px] border border-white/80 bg-white/60 px-5 py-3.5 shadow-[0_1px_2px_rgba(120,70,40,0.05),0_6px_16px_-8px_rgba(160,95,60,0.18)] backdrop-blur-sm transition duration-300 ease-out hover:bg-white/85 hover:shadow-[0_1px_2px_rgba(120,70,40,0.06),0_10px_22px_-10px_rgba(160,95,60,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0926a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff3e8] dark:border-white/5 dark:bg-white/[0.04] dark:shadow-none dark:hover:bg-white/[0.08] dark:focus-visible:ring-offset-[#211812]"
    >
      <div className="min-w-0">
        <p className="truncate text-[15px] font-semibold tracking-tight">{link.title}</p>
        {link.description && (
          <p className="mt-0.5 truncate text-[13px] text-[#9a7b69] dark:text-[#b89c8a]">{link.description}</p>
        )}
      </div>
      <span className="ml-auto shrink-0 text-xs tabular-nums text-[#b08f7d] dark:text-[#9c8070]">
        <span className="sr-only">클릭 수 </span>
        {count.toLocaleString("ko-KR")}회
      </span>
      <span className="-ml-2 flex h-8 w-6 shrink-0 items-center justify-center text-[#c9a594] transition-colors duration-300 group-hover:text-[#d9794b] dark:text-[#7d6355] dark:group-hover:text-[#f0a37c]">
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
        >
          <path d="M5 11 11 5M6 5h5v5" />
        </svg>
      </span>
    </a>
  );
}
