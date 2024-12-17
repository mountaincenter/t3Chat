"use client";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useChatStore } from "@/store/useChatStore";
import Pusher from "pusher-js";
import type { NewMessageEvent } from "../types";

export const useConversationMutation = () => {
  const { data: session } = useSession();
  const setConversationId = useChatStore((state) => state.setConversationId);

  // 会話の開始または取得ミューテーション
  const createOrGetConversationMutation =
    api.conversation.createOrGet.useMutation();

  const createUserConversation = async (targetUserId: string) => {
    if (!session?.user.id) {
      throw new Error("User is not authenticated");
    }

    const newConversation = await createOrGetConversationMutation.mutateAsync({
      participantIds: [session.user.id, targetUserId].sort(),
    });

    setConversationId(newConversation.id);

    // Pusher クライアントの初期化
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`conversation-${newConversation.id}`);

    channel.bind("new-message", (message: NewMessageEvent) => {
      console.log("New message received:", message);
    });

    return newConversation;
  };

  return {
    createUserConversation,
  };
};
