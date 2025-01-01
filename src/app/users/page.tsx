"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserMutation } from "../hooks/useUserMutation";
import { useState, useEffect } from "react";
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import ConversationMessage from "./ConversationMessage";
import { useChatStore } from "@/store/useChatStore";
import { formatDate } from "@/lib/utils"; // フォーマット関数をインポート

const Page = () => {
  const { user, users } = useUserMutation();
  const { selectedUser } = useChatStore();

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (user && selectedUser) {
      const initialMessages = getRealtimeMessages(user.id, selectedUser.id);
      setMessages(initialMessages);
    }
  }, [user, selectedUser]);

  if (!user || !users) return;

  // 日付区切りを追加してメッセージをレンダリング
  const renderMessagesWithDateSeparators = () => {
    let lastDate: string | null = null;

    return messages.map((message) => {
      const messageDate = new Date(message.timestamp);
      const formattedDate = formatDate(messageDate);

      const isNewDate = formattedDate !== lastDate;
      lastDate = formattedDate;

      return (
        <div key={message.id}>
          {isNewDate && (
            <div className="my-4 text-center text-sm font-semibold text-gray-500">
              {formattedDate}
            </div>
          )}
          <ConversationMessage
            content={message.content}
            senderId={message.senderId}
            files={message.files}
            timestamp={messageDate}
            isOwnMessage={message.senderId === user.id}
            selectedUser={selectedUser!}
          />
        </div>
      );
    });
  };

  return (
    <div className="flex h-[calc(100vh-60px)] w-full flex-col">
      <ConversationHeader username={selectedUser?.name ?? "ユーザー名"} />

      <ScrollArea className="min-h-0 flex-grow overflow-auto">
        <div className="space-y-4 p-4">
          {renderMessagesWithDateSeparators()}
        </div>
      </ScrollArea>

      <ConversationFooter />
    </div>
  );
};

export default Page;
