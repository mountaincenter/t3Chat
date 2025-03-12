import { useEffect } from "react";
import Pusher from "pusher-js";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import type { MessageWithFilesAndSender, CreateMessageInput } from "../types";
import type { RefetchOptions, QueryObserverResult } from "react-query";

export const useMessageMutation = (
  conversationId: string | null,
): {
  messages: MessageWithFilesAndSender[] | undefined;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<MessageWithFilesAndSender[], unknown>>;
  createMessage: (data: CreateMessageInput) => Promise<void>;
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

  const createMessageMutation = api.message.create.useMutation();
  const uploadFileMutation = api.upload.uploadFile.useMutation({
    onError: (error) => {
      console.error("Failed to upload file:", error);
    },
  });

  useEffect(() => {
    if (status !== "authenticated" || !conversationId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`message-channel-${conversationId}`);
    const handleMessageUpdate = async () => {
      await refetchMessages();
    };

    channel.bind("new-message", handleMessageUpdate);
    channel.bind("message-read", handleMessageUpdate);

    return () => {
      channel.unbind("new-message", handleMessageUpdate);
      channel.unbind("message-read", handleMessageUpdate);
      pusher.unsubscribe(`message-channel-${conversationId}`);
    };
  }, [refetchMessages, conversationId, status]);

  const createMessage = async (data: CreateMessageInput) => {
    try {
      const uploadedFiles = await Promise.all(
        data.files?.map(async (file) => {
          const arrayBuffer = await fetch(file.url).then((res) =>
            res.arrayBuffer(),
          );

          // SharedArrayBuffer を ArrayBuffer に変換
          const validArrayBuffer =
            arrayBuffer instanceof SharedArrayBuffer
              ? new Uint8Array(arrayBuffer).buffer
              : arrayBuffer;

          // Buffer に変換
          const buffer = Buffer.from(validArrayBuffer); // 型エラーが発生しない

          const response = await uploadFileMutation.mutateAsync({
            originalFilename: file.url,
            fileBuffer: buffer, // Buffer を渡す
          });

          return { url: response.url, fileType: file.fileType };
        }) ?? [],
      );
      createMessageMutation.mutate({
        content: data.content,
        conversationId: conversationId ?? "",
        files: uploadedFiles,
      });
    } catch (error) {
      console.error("Failed to create message with files:", error);
    }
  };

  const updateMessageMutation = api.message.update.useMutation();
  const deleteMessageMutation = api.message.delete.useMutation();
  const markAsReadMutation = api.message.markAsRead.useMutation();

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
