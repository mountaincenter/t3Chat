"use client";

import React from "react";
import { useUserMutation } from "../hooks/useUserMutation";
import { useChatStore } from "@/store/useChatStore";
import { useMessageMutation } from "../hooks/useMessageMutation";
import ConversationHeader from "../users/ConversationHeader";
import ConversationFooter, {
  type ConversationFooterProps,
} from "../users/ConversationFooter";
import MessageList from "../users/MessageList";

const Page = () => {
  const { user } = useUserMutation();
  const { conversationId, selectedUser } = useChatStore();
  const { messages, refetch } = useMessageMutation(conversationId);

  // 新しいメッセージをロードする処理
  const handleLoadMoreMessages = async () => {
    if (!conversationId) return;

    console.log("Loading more messages...");
    await refetch(); // メッセージを再取得する
  };

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-muted-foreground">Loading user information...</p>
      </div>
    );
  }

  // selectedUser が選択されていない場合
  if (!selectedUser) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-muted-foreground">
          Please select a user to start a conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-60px)] w-full flex-col">
      <ConversationHeader username={selectedUser.name ?? "ユーザー名"} />
      <MessageList
        messages={messages ?? []}
        onLoadMore={handleLoadMoreMessages}
      />
      <ConversationFooter
        refetchMessages={refetch as ConversationFooterProps["refetchMessages"]}
      />
    </div>
  );
};

export default Page;
