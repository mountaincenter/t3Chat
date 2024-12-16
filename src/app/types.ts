import type { User, FileType, File, Message } from "@prisma/client";
import type { LucideProps } from "lucide-react";

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
// ユーザー詳細型（メール関連を除外）
export type UserWithDetails = Partial<Omit<User, "email" | "emailVerified">> & {
  id: string;
  conversations?: Conversation[]; // conversationsをオプショナルにする
  unreadCount?: number;
};

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

// メッセージ型の拡張

export interface OptimisticMessage extends Omit<Message, "id" | "timestamp"> {
  id: string;
  timestamp: string;
  sending?: boolean;
  files?: File[];
}

export interface CreateMessageInput {
  content: string;
  senderId: string;
  files?: {
    url: string;
    fileType: FileType;
  }[];
}
