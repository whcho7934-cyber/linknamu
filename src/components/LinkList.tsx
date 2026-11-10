"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Props = {
  links: LinkItem[];
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

export default function LinkList({ links }: Props) {
  // 데이터를 받기 전에는 모두 0회로 보여 줍니다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Record<string, number> } | null) => {
        if (!data?.counts) return;
        // 받아 오는 사이에 누른 클릭이 사라지지 않도록, 더 큰 값을 남깁니다.
        setCounts((prev) => {
          const next = { ...data.counts };
          for (const [id, n] of Object.entries(prev)) next[id] = Math.max(next[id] ?? 0, n);
          return next;
        });
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const handleClick = (id: string) => {
    recordClick(id);
    // 서버 응답을 기다리지 않고 화면의 숫자를 바로 1 올립니다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="mt-10 flex flex-col gap-3.5">
      {links.map((link, i) => (
        <li key={link.id} className="animate-rise" style={{ animationDelay: `${150 + i * 70}ms` }}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
