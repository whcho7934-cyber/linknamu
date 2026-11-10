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
  name: "김개발",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심",
  avatarUrl: "/profile.png",
  links: [
    {
      id: "github",
      title: "깃허브",
      url: "https://www.naver.com",
      description: "만든 프로젝트 모아보기",
    },
    {
      id: "linkedin",
      title: "링크드인",
      url: "http://www.daum.net",
      description: "경력과 이력",
    },
    {
      id: "email",
      title: "이메일",
      url: "https://www.google.com",
    },
  ],
};
