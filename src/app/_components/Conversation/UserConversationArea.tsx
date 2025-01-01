"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Paperclip } from "lucide-react";
import Image from "next/image";
import type { Message, FileType } from "@prisma/client";
import type { UserWithDetails } from "@/app/types";

interface ConversationAreaProps {
  conversationId: string;
  user: UserWithDetails;
}

const UserConversationArea: React.FC<ConversationAreaProps> = ({
  conversationId,
  user,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // ダミーデータ
  const realtimeMessages: Message[] = [
    {
      id: "1",
      content: "こんにちは！",
      senderId: "user1",
      timestamp: new Date(),
    },
    {
      id: "2",
      content: "お元気ですか？",
      senderId: "user2",
      timestamp: new Date(),
    },
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [realtimeMessages]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">
          {selectedUser?.name} {/* グループ名またはユーザー名を表示 */}
        </h2>
      </div>

      {/* ScrollArea 可変部分 */}
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto px-4 py-2"
      >
        {realtimeMessages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.senderId === user.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`inline-block max-w-[70%] rounded-lg p-3 ${
                message.senderId === user.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              <p>{message.content}</p>
              <p className="mt-1 text-right text-xs opacity-70">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>

      {/* Footer固定 */}
      <footer className="flex items-center border-t bg-gray-800 px-4 py-2">
        <label htmlFor="file-upload" className="mr-2 cursor-pointer">
          <Paperclip className="h-6 w-6 text-gray-400" />
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setSelectedFile(file);
              const reader = new FileReader();
              reader.onloadend = () => setFilePreview(reader.result as string);
              reader.readAsDataURL(file);
            }
          }}
        />

        <Input
          placeholder="メッセージを入力"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-md bg-gray-700 text-white"
        />
        <Button
          type="button"
          size="icon"
          onClick={() => setNewMessage("")}
          className="ml-2 bg-blue-500 hover:bg-blue-600"
        >
          <SendHorizontal className="h-5 w-5 text-white" />
        </Button>
      </footer>
    </div>
  );
};

export default UserConversationArea;
