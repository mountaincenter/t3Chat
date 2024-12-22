"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserMutation } from "../hooks/useUserMutation";
import { useState, useEffect } from "react";
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import ConversationMessage from "./ConversationMessage";
import { getRealtimeMessages } from "./data";
import { useChatStore } from "@/store/useChatStore";
import { formatDate } from "@/lib/utils"; // フォーマット関数をインポート
import type { Message } from "./data";

const Page = () => {
  const { user, users } = useUserMutation();
  const { selectedUser } = useChatStore();

  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
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

    return messages.map((message, index) => {
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

  // メッセージ送信処理
  const handleSendMessage = () => {
    if (newMessage.trim() || image) {
      const message = {
        id: String(messages.length + 1),
        content: newMessage,
        senderId: user.id,
        timestamp: new Date().toISOString(),
        files: image
          ? [{ url: URL.createObjectURL(image), fileType: "IMAGE" }]
          : [],
      };
      setMessages([...messages, message]);
      setNewMessage("");
      setImage(null);
    }
  };

  // ファイル選択処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="flex h-[calc(100vh-60px)] w-full flex-col">
      <ConversationHeader username={selectedUser?.name ?? "ユーザー名"} />

      <ScrollArea className="min-h-0 flex-grow overflow-auto">
        <div className="space-y-4 p-4">
          {renderMessagesWithDateSeparators()}
        </div>
      </ScrollArea>

      <ConversationFooter
        message={newMessage}
        onMessageChange={setNewMessage}
        onSendMessage={handleSendMessage}
        onFileChange={handleFileChange}
      />
    </div>
  );
};

export default Page;
