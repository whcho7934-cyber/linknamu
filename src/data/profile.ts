export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  avatarUrl: string;
  links: LinkItem[];
};

// TODO: 아래 값은 모두 보여주기용 더미입니다. 실제 내용으로 교체하세요.
//  - avatarUrl: public/ 폴더에 사진을 넣고 경로를 바꾸면 됩니다.
//  - links의 id는 클릭 수 집계 키로 쓰이므로 한 번 정하면 바꾸지 않는 것이 좋습니다.
export const profile: Profile = {
  name: "김클로",
  bio: "세계 최강 바이브 코더",
  avatarUrl: "/avatar.svg",
  links: [
    {
      id: "github",
      title: "GitHub",
      url: "https://github.com/your-id",
      description: "만든 프로젝트 모아보기",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/your-id",
      description: "경력과 이력",
    },
    {
      id: "blog",
      title: "Blog",
      url: "https://your-blog.example.com",
      description: "개발하며 배운 것들",
    },
  ],
};
