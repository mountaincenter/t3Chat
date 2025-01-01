import React, { useRef, useEffect } from "react";
import ConversationMessage from "./ConversationMessage";
import { formatDate } from "@/lib/utils";
import type { MessageWithFilesAndSender } from "../types";

interface MessageListProps {
  messages: MessageWithFilesAndSender[];
  onLoadMore: () => void; // 上部へスクロール時に呼び出す関数
}

const MessageList = ({ messages, onLoadMore }: MessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  let lastDate: string | null = null;

  // 初期表示時にスクロールを最下部に設定
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  // 上部スクロール時に新しいメッセージをロード
  const handleScroll = () => {
    if (containerRef.current?.scrollTop === 0) {
      onLoadMore();
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full overflow-y-auto"
    >
      {messages.map((message) => {
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
            <ConversationMessage message={message} />
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
