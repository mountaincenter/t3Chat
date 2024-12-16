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
  getByConversationId: protectedProcedure
    .input(z.string())
    .query(({ input }) => messageHandler.getMessageByConversationId(input)),

  create: protectedProcedure
    .input(messageCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return await messageHandler.createMessage({
        content: input.content ?? "",
        conversationId: input.conversationId,
        senderId: ctx.session.user.id,
        files: input.files,
      });
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
