import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const messageHandler = {
  // 会話IDでメッセージを取得
  getMessageByConversationId: async (conversationId: string) => {
    try {
      return await prisma.message.findMany({
        where: { conversationId },
        include: {
          sender: true,
          readBy: true,
        },
        orderBy: { timestamp: "asc" },
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw new Error("Could not fetch messages");
    }
  },
};
