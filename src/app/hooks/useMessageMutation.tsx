import { useEffect } from "react";
import Pusher from "pusher-js";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import type { MessageWithFilesAndSender } from "../types";
import type { RefetchOptions, QueryObserverResult } from "react-query";

export const useMessageMutation = (
  conversationId: string | null,
): {
  messages: MessageWithFilesAndSender[] | undefined;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<MessageWithFilesAndSender[], unknown>>;
  createMessage: (data: {
    content: string;
    senderId: string;
    files?: {
      url: string;
      fileType: "IMAGE" | "DOCUMENT" | "PDF" | "VIDEO" | "AUDIO";
    }[];
  }) => void;
  updateMessage: (messageId: string, content: string) => void;
  deleteMessage: (id: string) => void;
  markMessageAsRead: (messageId: string) => void;
  isMessagesLoading: boolean;
} => {
  const { status } = useSession();

  const {
    data: messages,
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = api.message.getByConversationId.useQuery(conversationId ?? "", {
    enabled: status === "authenticated" && Boolean(conversationId),
  });

  const createMessageMutation = api.message.create.useMutation({
    onError: (error) => console.error("Failed to create message:", error),
    onSuccess: () => {
      if (
        process.env.NEXT_PUBLIC_PUSHER_KEY &&
        process.env.NEXT_PUBLIC_PUSHER_CLUSTER &&
        conversationId
      ) {
      }
    },
  });

  useEffect(() => {
    if (status !== "authenticated" || !conversationId) return;

    if (
      !process.env.NEXT_PUBLIC_PUSHER_KEY ||
      !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
    ) {
      console.error("Pusher environment variables are not defined");
      return;
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe(`message-channel-${conversationId}`);
    console.log(
      "Pusher: Subscribed to channel",
      `message-channel-${conversationId}`,
    );

    const handleMessageUpdate = async () => {
      console.log("Pusher: Received new-message or message-read event");
      await refetchMessages(); // 最新のデータを取得
    };

    channel.bind("new-message", handleMessageUpdate);
    channel.bind("message-read", handleMessageUpdate);

    return () => {
      console.log(
        "Pusher: Unsubscribing from channel",
        `message-channel-${conversationId}`,
      );
      channel.unbind("new-message", handleMessageUpdate);
      channel.unbind("message-read", handleMessageUpdate);
      pusher.unsubscribe(`message-channel-${conversationId}`);
    };
  }, [refetchMessages, conversationId, status]);

  const createMessage = (data: {
    content: string;
    senderId: string;
    files?: {
      url: string;
      fileType: "IMAGE" | "DOCUMENT" | "PDF" | "VIDEO" | "AUDIO";
    }[];
  }) => {
    console.log("Creating message:", data);
    createMessageMutation.mutate({
      content: data.content,
      conversationId: conversationId ?? "",
      files: data.files ?? [],
    });
  };

  const updateMessageMutation = api.message.update.useMutation({
    onError: (error) => console.error("Failed to update message:", error),
  });

  const deleteMessageMutation = api.message.delete.useMutation({
    onError: (error) => console.error("Failed to delete message:", error),
  });

  const markAsReadMutation = api.message.markAsRead.useMutation({
    onError: (error) => console.error("Failed to mark message as read:", error),
  });

  const updateMessage = (messageId: string, content: string) => {
    updateMessageMutation.mutate({ messageId, content });
  };

  const deleteMessage = (id: string) => {
    deleteMessageMutation.mutate(id);
  };

  const markMessageAsRead = (messageId: string) => {
    markAsReadMutation.mutate({
      messageId,
      conversationId: conversationId ?? "",
    });
  };

  return {
    messages,
    refetch: refetchMessages as unknown as (
      options?: RefetchOptions,
    ) => Promise<QueryObserverResult<MessageWithFilesAndSender[], unknown>>,
    createMessage,
    updateMessage,
    deleteMessage,
    markMessageAsRead,
    isMessagesLoading,
  };
};
