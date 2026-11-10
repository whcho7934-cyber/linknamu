import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  avatarUrl: string;
};

export default function ProfileHeader({ name, bio, avatarUrl }: Props) {
  return (
    <section className="animate-rise mt-6 flex flex-col items-center text-center">
      {/* 흰 테두리 + 아래로 떨어지는 따뜻한 그림자로 살짝 떠 있는 느낌 */}
      <div className="rounded-full bg-gradient-to-b from-white to-[#fbe9dc] p-1.5 shadow-[0_2px_4px_rgba(120,70,40,0.08),0_14px_32px_-10px_rgba(196,112,72,0.45)] dark:from-[#3a2a21] dark:to-[#241913] dark:shadow-[0_14px_32px_-10px_rgba(0,0,0,0.7)]">
        <div className="relative h-28 w-28 overflow-hidden rounded-full sm:h-32 sm:w-32">
          <Image src={avatarUrl} alt={`${name} 프로필 사진`} fill sizes="128px" className="object-cover" priority />
          {/* 위쪽 하이라이트, 아래쪽 음영으로 입체감 */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full shadow-[inset_0_2px_6px_rgba(255,255,255,0.5),inset_0_-6px_12px_rgba(90,50,30,0.18)]"
          />
        </div>
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-[#8a6a58] dark:text-[#c9ad9b]">{bio}</p>
    </section>
  );
}
