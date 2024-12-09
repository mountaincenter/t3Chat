import { PrismaClient, type Prisma, type Conversation } from "@prisma/client";

const prisma = new PrismaClient();

export const conversationHandler = {
  // 会話IDを使用して特定の会話を取得
  getConversationById: async (
    conversationId: string,
  ): Promise<Conversation | null> => {
    try {
      return await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { participants: true, messages: true },
      });
    } catch (error) {
      console.error(
        `[conversationHandler] - getConversationById Error (ID (${conversationId})):`,
        error,
      );
      throw new Error("Could not fetch conversation by ID");
    }
  },

  // 特定のユーザーが参加している全ての会話を取得
  getConversationByUser: async (userId: string): Promise<Conversation[]> => {
    try {
      return await prisma.conversation.findMany({
        where: {
          participants: {
            some: {
              id: userId,
            },
          },
        },
        include: { participants: true, messages: true },
      });
    } catch (error) {
      console.error(
        `[conversationHandler] - getConvesationByUser Error (UserId: ${userId}):`,
        error,
      );
      throw new Error("Could not fetch user's conversations");
    }
  },

  // 特定の参加者全員が含まれる会話を取得
  getConversationByParticipants: async (
    participantIds: string[],
  ): Promise<Conversation | null> => {
    try {
      if (participantIds.length === 0) {
        throw new Error("Participant IDs cannot be empty");
      }
      const conversations = await prisma.conversation.findMany({
        where: {
          participants: {
            every: {
              id: { in: participantIds },
            },
          },
        },
        include: { participants: true, messages: true },
      });
      // ロジック修正: 一致する参加者の数を確認
      return (
        conversations.find(
          (conversation) =>
            conversation.participants.length === participantIds.length,
        ) ?? null
      );
    } catch (error) {
      console.error(
        `[conversationHandler] - getConversationByParticipants Error (Participants: ${participantIds.join(", ")})`,
        error,
      );
      throw new Error("Could not fetch conversation by participants");
    }
  },

  createConversation: async ({
    name,
    participantIds,
  }: {
    name?: string;
    participantIds: string[];
  }): Promise<Conversation> => {
    try {
      if (participantIds.length === 0) {
        throw new Error("Participant IDs cannot be empty");
      }
      const existingConversation =
        await conversationHandler.getConversationByParticipants(participantIds);
      if (existingConversation) {
        return existingConversation;
      }
      return await prisma.conversation.create({
        data: {
          name,
          participants: {
            connect: participantIds.map((id) => ({ id })),
          },
        },
        include: { participants: true },
      });
    } catch (error) {
      console.error(
        `[conversationHandler] - createConversation Error (Participants: ${participantIds.join(
          ", ",
        )}):`,
        error,
      );
      throw new Error("Could not create conversation");
    }
  },

  // 会話を更新
  updateConversation: async (
    id: string,
    updates: { name?: string; participantIds?: string[] },
  ): Promise<Conversation> => {
    try {
      const data: Prisma.ConversationUpdateInput = {};
      if (updates.name) {
        data.name = updates.name;
      }
      if (updates.participantIds) {
        if (updates.participantIds.length === 0) {
          throw new Error("Participant IDs cannot be empty");
        }
        data.participants = {
          set: updates.participantIds.map((id) => ({ id })),
        };
      }
      return await prisma.conversation.update({
        where: { id },
        data,
        include: { participants: true },
      });
    } catch (error) {
      console.error(
        `[conversationHandler] - updateConversation Error (ID: ${id}):`,
        error,
      );
      throw new Error("Could not update conversation");
    }
  },

  // 会話を削除
  deleteConversation: async (id: string): Promise<Conversation> => {
    try {
      return await prisma.conversation.delete({
        where: { id },
      });
    } catch (error) {
      console.error(
        `[conversationHandler] - deleteConversation Error (ID: ${id}):`,
        error,
      );
      throw new Error("Could not delete conversation");
    }
  },
};
