import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { conversationHandler } from "@/server/api/handlers/conversationHandler";
import { z } from "zod";

const conversationCreateSchema = z.object({
  title: z.string().optional(),
  participantIds: z.array(z.string()),
});

export const conversationRouter = createTRPCRouter({
  // 会話を取得
  getById: protectedProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const conversation = await conversationHandler.getConversationById(input);
      if (!conversation) {
        throw new Error("Conversation not found");
      }
      return conversation;
    } catch (error) {
      console.error("[conversationRouter] getById - Error:", error);
      throw new Error("Could not fetch conversation");
    }
  }),

  // 現在のユーザーが参加している会話を取得
  getConversationsByUser: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await conversationHandler.getConversationByUser(
        ctx.session.user.id,
      );
    } catch (error) {
      console.error(
        "[conversationRouter] getCounversationByUser - Error:",
        error,
      );
      throw new Error("Could not fetch user's conversations");
    }
  }),

  // 会話を作成
  createOrGet: protectedProcedure
    .input(conversationCreateSchema)
    .mutation(async ({ input }) => {
      try {
        // まず、既存の会話があるかをチェック
        const existingConversation =
          await conversationHandler.getConversationByParticipants(
            input.participantIds,
          );

        if (existingConversation) {
          return existingConversation; // 既存の会話があればそれを返す
        }

        // 既存の会話がない場合、新しい会話を作成
        return await conversationHandler.createConversation(input);
      } catch (error) {
        console.error("[conversationRouter] createOrGer - Error:", error);
        throw new Error("Could not create or get conversation");
      }
    }),

  // 会話を更新
  update: protectedProcedure
    .input(conversationCreateSchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        return await conversationHandler.updateConversation(input.id, input);
      } catch (error) {
        console.error("Error updating conversation:", error);
        throw new Error("Could not update conversation");
      }
    }),

  // 会話を削除
  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      return await conversationHandler.deleteConversation(input);
    } catch (error) {
      console.error("[conversationRouter] delete -Error:", error);
      throw new Error("Could not delete conversation");
    }
  }),
});
