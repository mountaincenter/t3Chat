"use client";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useOptimistic } from "react";
import type { OptimisticMessage, CreateMessageInput } from "@/app/types";

export const useMessageMutation = (conversationId: string) => {
  const { status } = useSession();

  // 楽観的なメッセージリストの管理
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    OptimisticMessage[],
    OptimisticMessage
  >([], (current, newMessage) => [...current, newMessage]);

  const createMessageMutation = api.message.create.useMutation({
    onMutate: async (newMessage: CreateMessageInput) => {
      // 楽観的なメッセージの追加
      const optimisticMessage: OptimisticMessage = {
        id: `optimistic-${Date.now()}`, // 一時的なID
        timestamp: new Date().toISOString(),
        sending: true,
        type: "TEXT", // デフォルトの型を追加
        isDeleted: false, // 初期値を設定
        senderId: newMessage.senderId,
        conversationId, // 必須フィールドの追加
        content: newMessage.content ?? "",
        files: newMessage.files ?? [],
      };

      addOptimisticMessage(optimisticMessage); // 楽観的にメッセージを追加
      return { optimisticMessage };
    },
    onSuccess: (newMessage, variables, context) => {
      // サーバー応答後、楽観的なメッセージを置き換え
      addOptimisticMessage((prev) =>
        prev.map((msg) =>
          msg.id === context?.optimisticMessage.id ? newMessage : msg,
        ),
      );
    },
    onError: (error, variables, context) => {
      // エラー時は楽観的なメッセージを削除
      addOptimisticMessage((prev) =>
        prev.filter((msg) => msg.id !== context?.optimisticMessage.id),
      );
    },
  });

  const updateMessageMutation = api.message.update.useMutation();
  const deleteMessageMutation = api.message.delete.useMutation();
  const markAsReadMutation = api.message.markAsRead.useMutation();

  const sendMessage = async (data: CreateMessageInput) => {
    createMessageMutation.mutate({
      content: data.content,
      conversationId,
      files: data.files ?? [],
    });
  };

  const updateMessage = (messageId: string, content: string) => {
    updateMessageMutation.mutate({ messageId, content });
  };

  const deleteMessage = (id: string) => {
    deleteMessageMutation.mutate(id);
  };

  const markMessageAsRead = async (messageId: string) => {
    markAsReadMutation.mutate({ messageId, conversationId });
  };

  return {
    messages: optimisticMessages, // 楽観的なメッセージリストを使用
    sendMessage,
    updateMessage,
    deleteMessage,
    markMessageAsRead,
    isMessagesLoading: createMessageMutation.isLoading,
  };
};
