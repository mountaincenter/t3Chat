import type { User } from "@prisma/client";

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

interface Conversation {
  id: string;
  name: string | null;
}

export interface UserWithDetails extends User {
  conversations?: Conversation[]; // conversationsをオプショナルにする
  unreadCount?: number;
}
