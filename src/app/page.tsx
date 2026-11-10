import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

// 와이어프레임 구성: 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 목록(세로)
export default function Home() {
  return (
    // 배경: 위는 크림색, 아래로 갈수록 연한 살구색
    <div className="min-h-screen bg-gradient-to-b from-[#fff8ef] via-[#ffefe2] to-[#ffdcc8] dark:from-[#1a1411] dark:via-[#211812] dark:to-[#2c1c15]">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-16 pt-5">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>

        <ProfileHeader name={profile.name} bio={profile.bio} avatarUrl={profile.avatarUrl} />

        <ul className="mt-10 flex flex-col gap-3.5">
          {profile.links.map((link, i) => (
            <li key={link.id} className="animate-rise" style={{ animationDelay: `${150 + i * 70}ms` }}>
              <LinkCard link={link} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
