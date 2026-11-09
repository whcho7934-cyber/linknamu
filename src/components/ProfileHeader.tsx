import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  avatarUrl: string;
};

export default function ProfileHeader({ name, bio, avatarUrl }: Props) {
  return (
    <section className="mt-4 flex flex-col items-center text-center">
      <div className="relative h-40 w-40 overflow-hidden rounded-full ring-4 ring-white shadow-md dark:ring-stone-800 sm:h-44 sm:w-44">
        <Image src={avatarUrl} alt={`${name} 프로필 사진`} fill sizes="176px" className="object-cover" priority />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">{name}</h1>
      <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">{bio}</p>
    </section>
  );
}
