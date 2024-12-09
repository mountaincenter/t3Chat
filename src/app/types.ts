import type { User } from "@prisma/client";
import { LucideProps } from "lucide-react";

// NextAuthのセッション型
export interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string | null;
}

export interface Session {
  user?: SessionUser;
  expires: string; // セッションの有効期限
}

// ユーザー詳細型
interface Conversation {
  id: string;
  name: string | null;
}

export interface UserWithDetails extends User {
  conversations?: Conversation[]; // conversationsをオプショナルにする
  unreadCount?: number;
}

// Sidebarで使用する型
export interface Item {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
}

// メールデータ型
export interface Mail {
  name: string;
  email: string;
  subject: string;
  date: string;
  teaser: string;
}
