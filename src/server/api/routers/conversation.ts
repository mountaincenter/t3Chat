import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { conversationHandler } from "@/server/api/handlers/conversationHandler";
import { z } from "zod";

const conversationCreateSchema = z.object({
  title: z.string().optional(),
  participantIds: z.array(z.string()),
});

export const conversationRouter = createTRPCRouter({
  getById: protectedProcedure.input(z.string()).query(async ({ input }) => {
    const conversation = await conversationHandler.getConversationById(input);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    return conversation;
  }),

  getConversationsByUser: protectedProcedure.query(async ({ ctx }) => {
    return await conversationHandler.getConversationByUser(ctx.session.user.id);
  }),

  createOrGet: protectedProcedure
    .input(conversationCreateSchema)
    .mutation(async ({ input }) => {
      return await conversationHandler.createConversation(input);
    }),

  update: protectedProcedure
    .input(conversationCreateSchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await conversationHandler.updateConversation(input.id, input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    return await conversationHandler.deleteConversation(input);
  }),
});
