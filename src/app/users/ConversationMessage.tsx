import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Avatar コンポーネントのインポート
import type { UserWithDetails } from "../types";

interface ConversationMessageProps {
  content: string;
  senderId: string;
  selectedUser: UserWithDetails;
  imageUrl?: string;
  timestamp: Date;
  isOwnMessage: boolean;
  isRead?: boolean; // 既読フラグを追加
}

const ConversationMessage = ({
  content,
  selectedUser,
  imageUrl,
  timestamp,
  isOwnMessage,
  isRead = true, // デフォルトは未読
}: ConversationMessageProps) => (
  <div
    className={`mb-4 flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
  >
    {/* 相手のメッセージ側に Avatar を表示 */}
    {!isOwnMessage && (
      <Avatar className="mr-2 h-10 w-10 shrink-0">
        {selectedUser.image && selectedUser.name ? (
          <AvatarImage src={selectedUser.image} alt={selectedUser.name} />
        ) : (
          <AvatarFallback>
            {selectedUser.name?.slice(0, 2).toUpperCase() ?? "??"}
          </AvatarFallback>
        )}
      </Avatar>
    )}

    {/* 時間とバブルをまとめる親要素 */}
    <div
      className={`flex items-end gap-2 ${
        isOwnMessage ? "flex-row-reverse" : ""
      }`}
    >
      {/* メッセージバブル */}
      <div
        className={`rounded-lg p-3 ${
          isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-100"
        } max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
        style={{
          whiteSpace: "pre-wrap", // 改行の維持
          wordBreak: "break-word", // 長文の折り返し
        }}
      >
        {/* 画像 */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="送信画像"
            width={200}
            height={200}
            className="mb-2 max-h-60 rounded-lg"
          />
        )}
        {/* テキスト */}
        {content && <p className="m-0">{content}</p>}
      </div>

      {/* 時間表示と既読 */}
      <div className="flex flex-col items-end">
        {/* 既読表示 */}
        {isOwnMessage && isRead && (
          <span className="mb-1 text-xs text-gray-400">既読</span>
        )}
        {/* 時間表示 */}
        <span className="text-xs text-gray-400">
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  </div>
);

export default ConversationMessage;
