import { createTRPCRouter, protectedProcedure } from "../trpc";
import { messageHandler } from "../handlers/messageHandler";
import { triggerEvent } from "@/server/service/pusher";
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
  getByConversationId: protectedProcedure
    .input(z.string())
    .query(({ input }) => messageHandler.getMessageByConversationId(input)),

  create: protectedProcedure
    .input(messageCreateSchema)
    .mutation(async ({ ctx, input }) => {
      // ここでログを追加して、サーバー側のPusher動作を確認
      console.log("Creating message for conversation:", input.conversationId);

      const newMessage = await messageHandler.createMessage({
        content: input.content ?? "",
        conversationId: input.conversationId,
        senderId: ctx.session.user.id,
        files: input.files,
      });

      console.log("New message created:", newMessage); // ログを追加
      const channel = `message-channel-${input.conversationId}`;
      await triggerEvent(channel, "new-message", newMessage);
      return newMessage;
    }),

  update: protectedProcedure
    .input(z.object({ messageId: z.string(), content: z.string() }))
    .mutation(async ({ input }) => {
      return await messageHandler.updateMessage(input.messageId, input.content);
    }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    return await messageHandler.deleteMessage(input);
  }),

  markAsRead: protectedProcedure
    .input(z.object({ messageId: z.string(), conversationId: z.string() }))
    .mutation(({ ctx, input }) => {
      return messageHandler.markMessageAsRead(
        input.messageId,
        ctx.session.user.id,
      );
    }),

  getUnreadMessagesCount: protectedProcedure
    .input(z.string())
    .query(({ input }) => messageHandler.getUnreadMessagesCount(input)),
});
