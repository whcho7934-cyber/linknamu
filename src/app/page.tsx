import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

// 와이어프레임 구성: 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 목록(세로)
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-12 pt-6">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <ProfileHeader name={profile.name} bio={profile.bio} avatarUrl={profile.avatarUrl} />

      <ul className="mt-8 flex flex-col gap-4">
        {profile.links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>
    </main>
  );
}
