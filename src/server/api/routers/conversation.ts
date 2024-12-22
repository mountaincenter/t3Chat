import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { conversationHandler } from "@/server/api/handlers/conversationHandler";
import { z } from "zod";

// 入力スキーマ
const conversationCreateSchema = z.object({
  title: z.string().optional(),
  participantIds: z.array(z.string()),
});

export const conversationRouter = createTRPCRouter({
  // 会話IDで取得
  getById: protectedProcedure.input(z.string()).query(async ({ input }) => {
    const conversation = await conversationHandler.getConversationById(input);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    return conversation;
  }),

  // ユーザーのすべての会話を取得
  getConversationsByUser: protectedProcedure.query(async ({ ctx }) => {
    return await conversationHandler.getConversationByUser(ctx.session.user.id);
  }),

  // 特定の参加者に基づく会話の作成または取得
  createOrGet: protectedProcedure
    .input(conversationCreateSchema)
    .mutation(async ({ input }) => {
      return await conversationHandler.createConversation(input);
    }),
});
