import { createTRPCRouter, protectedProcedure } from "../trpc";
import { messageHandler } from "../handlers/messageHandler";
import { z } from "zod";

const fileSchema = z.object({
  url: z.string(),
  fileType: z.enum(["IMAGE", "DOCUMENT", "PDF", "VIDEO", "AUDIO"]),
});

const messageCreateSchema = z.object({
  content: z.string().optional(),
  conversationId: z.string(),
  files: z.array(fileSchema).optional(),
});

export const messageRouter = createTRPCRouter({
  // メッセージを取得
  getByConversationId: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        return await messageHandler.getMessageByConversationId(input);
      } catch (error) {
        console.error(`[messageRouter] - Error fetching messages:`, error);
        throw new Error("Failed to fetch messages. Please try again.");
      }
    }),

  // メッセージを作成
  create: protectedProcedure
    .input(messageCreateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await messageHandler.createMessage({
          content: input.content ?? "",
          conversationId: input.conversationId,
          senderId: ctx.session.user.id,
          files: input.files,
        });
      } catch (error) {
        console.error(`[messageRouter] - Error creating message:`, error);
        throw new Error("Failed to create message. Please try again.");
      }
    }),

  // メッセージを更新
  update: protectedProcedure
    .input(
      z.object({
        messageId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await messageHandler.updateMessage(
          input.messageId,
          input.content,
        );
      } catch (error) {
        console.error(`[messageRouter] - Error updating message:`, error);
        throw new Error("Failed to update message. Please try again.");
      }
    }),

  // メッセージを削除
  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      return await messageHandler.deleteMessage(input);
    } catch (error) {
      console.error(`[messageRouter] - Error deleting message:`, error);
      throw new Error("Failed to delete message. Please try again.");
    }
  }),

  // メッセージを既読としてマーク
  markAsRead: protectedProcedure
    .input(
      z.object({
        messageId: z.string(),
        conversationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await messageHandler.markMessageAsRead(
          input.messageId,
          ctx.session.user.id,
        );
      } catch (error) {
        console.error(
          `[messageRouter] - Error marking message as read:`,
          error,
        );
        throw new Error("Failed to mark message as read. Please try again.");
      }
    }),

  // 未読メッセージの数を取得
  getUnreadMessagesCount: protectedProcedure
    .input(z.string()) // ユーザーIDを入力とする
    .query(async ({ input: userId }) => {
      try {
        return await messageHandler.getUnreadMessagesCount(userId);
      } catch (error) {
        console.error(
          `[messageRouter] - Error fetching unread messages count:`,
          error,
        );
        throw new Error(
          "Failed to fetch unread messages count. Please try again.",
        );
      }
    }),
});
