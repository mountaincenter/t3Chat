import { PrismaClient, type Conversation } from "@prisma/client";

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
            some: { id: userId },
          },
        },
        include: { participants: true, messages: true },
      });
    } catch (error) {
      console.error(
        `[conversationHandler] - getConversationByUser Error (UserId: ${userId}):`,
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
          AND: [
            { participants: { some: { id: participantIds[0] } } },
            { participants: { every: { id: { in: participantIds } } } },
          ],
        },
        include: { participants: true },
      });

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

  // 新しい会話を作成
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

      const existingConversation = await prisma.conversation.findFirst({
        where: {
          participants: {
            every: { id: participantIds[0] },
          },
        },
        include: { participants: true },
      });

      if (existingConversation) {
        return existingConversation;
      }

      return await prisma.conversation.create({
        data: {
          name,
          isGroup: participantIds.length > 1, // isGroup を設定
          participants: {
            connect: participantIds.map((id) => ({ id })),
          },
        },
        include: { participants: true },
      });
    } catch (error) {
      console.error(
        `[conversationHandler] - createConversation Error (Participants: ${participantIds.join(", ")}):`,
        error,
      );
      throw new Error("Could not create conversation");
    }
  },
};
