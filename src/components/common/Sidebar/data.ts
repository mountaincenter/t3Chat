import {
  UserRound,
  UsersRound,
  House,
  MessageCircleMore,
  Clock,
  Files,
} from "lucide-react";

// サンプルデータ
export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: House,
      isActive: true,
      requiresLogin: false, // ログイン不要
    },
    {
      title: "Users",
      url: "/users",
      icon: UserRound,
      isActive: false,
      requiresLogin: true, // ログインが必要
    },
    {
      title: "Message",
      url: "/chat",
      icon: MessageCircleMore,
      isActive: false,
      requiresLogin: true, // ログインが必要
    },
    {
      title: "Group",
      url: "#",
      icon: UsersRound,
      isActive: false,
      requiresLogin: true, // ログインが必要
    },
    {
      title: "Clock",
      url: "/",
      icon: Clock,
      isActive: false,
      requiresLogin: false, // ログイン不要
    },
    {
      title: "Files",
      url: "/files",
      icon: Files,
      isActive: false,
      requiresLogin: true, // ログインが必要
    },
  ],
};
