"use client";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useOptimistic } from "react";
import Pusher from "pusher-js";
import type {
  OptimisticMessage,
  CreateMessageInput,
  NewMessageEvent,
} from "@/app/types";

export const useMessageMutation = (conversationId: string) => {
  const { status } = useSession();

  // 楽観的なメッセージリストの管理
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    OptimisticMessage[],
    OptimisticMessage
  >([], (prev, newMessage) => [...prev, newMessage]);

  // Pusher 初期化
  useEffect(() => {
    if (status !== "authenticated" || !conversationId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`conversation-${conversationId}`);

    // 新しいメッセージイベントを処理
    channel.bind("new-message", (newMessage: NewMessageEvent) => {
      addOptimisticMessage((prev) => [...prev, newMessage]);
    });

    return () => {
      pusher.unsubscribe(`conversation-${conversationId}`);
    };
  }, [conversationId, status]);

  const createMessageMutation = api.message.create.useMutation({
    onMutate: async (newMessage: CreateMessageInput) => {
      const optimisticMessage: OptimisticMessage = {
        id: `optimistic-${Date.now()}`,
        timestamp: new Date().toISOString(),
        sending: true,
        type: "TEXT",
        isDeleted: false,
        senderId: newMessage.senderId,
        conversationId,
        content: newMessage.content ?? "",
        files: newMessage.files ?? [],
      };

      addOptimisticMessage(optimisticMessage);
      return { optimisticMessage };
    },

    onSuccess: (newMessage, variables, context) => {
      addOptimisticMessage((prev) =>
        prev.map((msg) =>
          msg.id === context?.optimisticMessage.id ? newMessage : msg,
        ),
      );
    },

    onError: (error, variables, context) => {
      addOptimisticMessage((prev) =>
        prev.filter((msg) => msg.id !== context?.optimisticMessage.id),
      );
    },
  });

  const updateMessageMutation = api.message.update.useMutation();
  const deleteMessageMutation = api.message.delete.useMutation();
  const markAsReadMutation = api.message.markAsRead.useMutation();

  const sendMessage = (data: CreateMessageInput) => {
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

  const markMessageAsRead = (messageId: string) => {
    markAsReadMutation.mutate({ messageId, conversationId });
  };

  return {
    messages: optimisticMessages,
    sendMessage,
    updateMessage,
    deleteMessage,
    markMessageAsRead,
    isMessagesLoading: createMessageMutation.status === "idle",
  };
};
