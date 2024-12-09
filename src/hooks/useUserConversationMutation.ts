"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export const useUserConversationMutation = () => {
  const [conversationId, setConversationId] = useState<string | null>(null);

  const createOrGetConversationMutation =
    api.conversation.createOrGet.useMutation();

  const { data: conversation, isLoading: isConversationLoading } =
    api.conversation.getById.useQuery(conversationId ?? "", {
      enabled: !!conversationId,
    });

  // 新しい会話を作成または既存の会話を取得する関数
  const createUserConversation = async (
    userId: string,
    targetUserId: string,
  ) => {
    try {
      const newConversation = await createOrGetConversationMutation.mutateAsync(
        {
          participantIds: [userId, targetUserId].sort(),
        },
      );
      setConversationId(newConversation.id);
      return newConversation;
    } catch (error) {
      console.error(
        `Failed to create or get conversation (userId: ${userId}, targetUserId: ${targetUserId}):`,
        error,
      );
      throw error;
    }
  };

  return {
    createUserConversation,
    conversation,
    conversationId,
    setConversationId,
    isConversationLoading,
  };
};
