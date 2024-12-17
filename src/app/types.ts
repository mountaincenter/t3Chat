import type {
  User,
  File,
  Message,
  FileType,
  Conversation,
} from "@prisma/client";
import type { LucideProps } from "lucide-react";
// =============================
// ユーザー関連の型
// =============================

// NextAuth セッション型
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

// ユーザー詳細型（メール除外）
export type UserWithDetails = Omit<User, "email" | "emailVerified"> & {
  conversations?: Partial<Conversation>[];
  unreadCount?: number;
};

// =============================
// メッセージ関連の型
// =============================

// 楽観的なメッセージ型
export interface OptimisticMessage extends Omit<Message, "id" | "timestamp"> {
  id: string; // 楽観的なメッセージID
  timestamp: string; // クライアント側のタイムスタンプ
  sending?: boolean; // 送信中フラグ
  files?: File[]; // 添付ファイル
}

// メッセージ作成用の入力型
export interface CreateMessageInput {
  content: string;
  senderId: string;
  files?: {
    url: string;
    fileType: FileType;
  }[];
}

// Pusher の新しいメッセージイベント型
export interface NewMessageEvent {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
  timestamp: string;
  files?: {
    url: string;
    fileType: FileType;
  }[];
}

// =============================
// 会話関連の型
// =============================

// 会話型（名前をオプション化）
export interface ConversationWithParticipants extends Conversation {
  participants: UserWithDetails[];
}

// =============================
// Sidebar や UI 用の型
// =============================

// Sidebar に表示するアイテム型
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
