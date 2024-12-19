"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserMutation } from "../hooks/useUserMutation";
import { useState, useEffect } from "react";
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import ConversationMessage from "./ConversationMessage";
import { getRealtimeMessages } from "./data";
import { useChatStore } from "@/store/useChatStore";

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  imageUrl?: string | string[] | null;
}

const Page = () => {
  const { user, users } = useUserMutation();
  const { selectedUser } = useChatStore();

  // メッセージの状態管理
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // 初期メッセージのロード
  useEffect(() => {
    if (user && selectedUser) {
      const initialMessages = getRealtimeMessages(user.id, selectedUser.id);
      setMessages(initialMessages);
    }
  }, [user, selectedUser]);

  if (!user || !users) return;

  // メッセージ送信処理
  const handleSendMessage = () => {
    if (newMessage.trim() || image) {
      const message = {
        id: String(messages.length + 1),
        content: newMessage,
        senderId: user.id,
        timestamp: new Date().toISOString(),
        imageUrl: image ? URL.createObjectURL(image) : undefined,
      };
      setMessages([...messages, message]);
      setNewMessage(""); // 入力クリア
      setImage(null); // 画像クリア
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
          {selectedUser &&
            messages.map((message) => (
              <ConversationMessage
                key={message.id}
                content={message.content}
                senderId={message.senderId}
                imageUrl={message.imageUrl}
                timestamp={new Date(message.timestamp)}
                isOwnMessage={message.senderId === user.id}
                selectedUser={selectedUser}
              />
            ))}
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
