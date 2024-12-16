import { PrismaClient, type FileType } from "@prisma/client";
import { triggerEvent } from "@/server/services/pusher";

const prisma = new PrismaClient();

export const messageHandler = {
  async getMessageByConversationId(conversationId: string) {
    return await prisma.message.findMany({
      where: { conversationId },
      include: { sender: true, files: true, readBy: true },
      orderBy: { timestamp: "asc" },
    });
  },

  async createMessage({
    content,
    conversationId,
    senderId,
    files,
  }: {
    content: string;
    conversationId: string;
    senderId: string;
    files?: { url: string; fileType: FileType }[];
  }) {
    const newMessage = await prisma.message.create({
      data: {
        content,
        sender: { connect: { id: senderId } },
        conversation: { connect: { id: conversationId } },
        files: files
          ? {
              create: files.map((file) => ({
                url: file.url,
                fileType: file.fileType,
              })),
            }
          : undefined,
      },
      include: { files: true, sender: true },
    });

    await triggerEvent(`conversation-${conversationId}`, "new-message", {
      message: newMessage,
    });
    return newMessage;
  },

  async markMessageAsRead(messageId: string, userId: string) {
    const message = await prisma.message.update({
      where: { id: messageId },
      data: { readBy: { connect: { id: userId } } },
    });

    await triggerEvent(
      `conversation-${message.conversationId}`,
      "message-read",
      { messageId, userId },
    );
    return message;
  },

  async getUnreadMessagesCount(userId: string) {
    const conversations = await prisma.conversation.findMany({
      where: { participants: { some: { id: userId } } },
      include: {
        messages: {
          where: {
            readBy: { none: { id: userId } },
            senderId: { not: userId },
          },
        },
      },
    });

    return conversations.map((conversation) => ({
      conversationId: conversation.id,
      unreadCount: conversation.messages.length,
    }));
  },
};
