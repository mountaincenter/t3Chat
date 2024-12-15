"use client";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useChatStore } from "@/store/useChatStore";

export const useConversationMutation = () => {
  const { data: session } = useSession();
  const setConversationId = useChatStore((state) => state.setConversationId);

  // 会話の開始または取得ミューテーション
  const createOrGetConversationMutation =
    api.conversation.createOrGet.useMutation();

  const createUserConversation = async (targetUserId: string) => {
    try {
      if (!session?.user.id) {
        throw new Error("User is not authenticated");
      }

      const newConversation = await createOrGetConversationMutation.mutateAsync(
        {
          participantIds: [session.user.id, targetUserId].sort(),
        },
      );

      setConversationId(newConversation.id); // Zustandの状態を更新
      return newConversation;
    } catch (error) {
      console.error("Failed to create or get conversation:", error);
      throw error;
    }
  };

  return {
    createUserConversation,
  };
};
