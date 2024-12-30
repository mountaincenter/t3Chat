"use client";
import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import type { Conversation } from "@prisma/client";

export const useConversationMutation = () => {
  const { status } = useSession();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const createOrGetConversationMutation =
    api.conversation.createOrGet.useMutation();

  // Pusher設定
  useEffect(() => {
    if (status !== "authenticated" || !conversationId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`conversation-${conversationId}`);

    const handleConversationUpdate = (updatedConversation: Conversation) => {
      setConversation(updatedConversation); // 更新された会話情報を状態に保存
    };

    channel.bind("conversation-update", handleConversationUpdate);

    return () => {
      channel.unbind("conversation-update", handleConversationUpdate);
      pusher.unsubscribe(`conversation-${conversationId}`);
    };
  }, [conversationId, status]);

  // 会話作成または取得
  const createOrGetConversation = async (data: {
    title?: string;
    participantIds: string[];
  }): Promise<Conversation> => {
    try {
      const newConversation =
        await createOrGetConversationMutation.mutateAsync(data);
      setConversationId(newConversation.id);
      setConversation(newConversation);
      return newConversation;
    } catch (error) {
      console.error("Failed to create or get conversation:", error);
      throw error;
    }
  };

  return {
    createOrGetConversation,
    conversationId,
    conversation,
  };
};
