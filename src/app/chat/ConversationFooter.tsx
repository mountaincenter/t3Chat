"use client";

import React, { useState } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useMessageMutation } from "@/app/hooks/useMessageMutation";
import { useChatStore } from "@/store/useChatStore";
import type { MessageWithFilesAndSender } from "../types";
import type { RefetchOptions, QueryObserverResult } from "react-query";

export interface ConversationFooterProps {
  refetchMessages: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<MessageWithFilesAndSender[], unknown>>;
}

const ConversationFooter: React.FC<ConversationFooterProps> = ({
  refetchMessages,
}) => {
  const { conversationId } = useChatStore(); // `conversationId` を取得
  const { createMessage } = useMessageMutation(conversationId); // `useMessageMutation` を利用
  const { data: session } = useSession(); // セッション情報を取得

  const [message, setMessage] = useState(""); // 入力中のメッセージを管理

  // メッセージ送信処理
  const handleSendMessage = async () => {
    if (!message.trim() || !session?.user?.id) return; // 空メッセージ送信防止
    void createMessage({ content: message, senderId: session.user.id });
    setMessage(""); // 入力欄をクリア

    try {
      await refetchMessages(); // メッセージを再取得
      console.log("Messages refetched successfully");
    } catch (error) {
      console.error("Failed to refetch messages", error);
    }
  };

  // ファイル選択処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      // 必要に応じてファイルアップロード処理を実装
    }
  };

  return (
    <footer className="flex items-center border-t bg-gray-800 px-4 py-2">
      <label htmlFor="file-upload" className="mr-2 cursor-pointer">
        <Paperclip className="h-6 w-6 text-gray-400" />
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="メッセージを入力"
        rows={2}
        className="flex-1 resize-none rounded-md bg-gray-700 p-2 text-white"
      />
      <Button
        type="button"
        size="icon"
        onClick={handleSendMessage}
        className="ml-2 bg-blue-500 hover:bg-blue-600"
      >
        <SendHorizontal className="h-5 w-5 text-white" />
      </Button>
    </footer>
  );
};

export default ConversationFooter;
