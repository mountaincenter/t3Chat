import { PrismaClient, type FileType } from "@prisma/client";

const prisma = new PrismaClient();

export const messageHandler = {
  // Fetch messages by conversation ID
  getMessageByConversationId: async (conversationId: string) => {
    try {
      return await prisma.message.findMany({
        where: { conversationId },
        include: { sender: true, files: true, readBy: true },
        orderBy: { timestamp: "asc" },
      });
    } catch (error) {
      console.error(
        `[messageHandler] - Error fetching messages (conversationId: ${conversationId})`,
        error,
      );
      throw new Error("Unable to fetch messages. Please try again later.");
    }
  },

  // Create a new message
  createMessage: async (messageData: {
    content: string;
    conversationId: string;
    senderId: string;
    files?: { url: string; fileType: FileType }[];
  }) => {
    try {
      const conversation = await prisma.conversation.findUnique({
        where: { id: messageData.conversationId },
        include: { participants: true },
      });

      if (!conversation) throw new Error("Conversation not found.");

      return await prisma.message.create({
        data: {
          content: messageData.content,
          sender: { connect: { id: messageData.senderId } },
          conversation: { connect: { id: messageData.conversationId } },
          files: messageData.files
            ? {
                create: messageData.files.map((file) => ({
                  url: file.url,
                  fileType: file.fileType,
                })),
              }
            : undefined,
        },
        include: { files: true, sender: true },
      });
    } catch (error) {
      console.error(`[messageHandler] - Error creating message:`, error);
      throw new Error("Unable to create message. Please try again later.");
    }
  },

  // Mark a message as read
  markMessageAsRead: async (messageId: string, userId: string) => {
    try {
      const isAlreadyRead = await prisma.message.findFirst({
        where: { id: messageId, readBy: { some: { id: userId } } },
      });

      if (!isAlreadyRead) {
        return await prisma.message.update({
          where: { id: messageId },
          data: { readBy: { connect: { id: userId } } },
        });
      }
      return null;
    } catch (error) {
      console.error(
        `[messageHandler] - Error marking message as read (messageId: ${messageId}, userId: ${userId}):`,
        error,
      );
      throw new Error(
        "Unable to mark message as read. Please try again later.",
      );
    }
  },

  // Update message content
  updateMessage: async (id: string, content: string) => {
    try {
      return await prisma.message.update({ where: { id }, data: { content } });
    } catch (error) {
      console.error(
        `[messageHandler] - Error updating message (ID: ${id}):`,
        error,
      );
      throw new Error("Unable to update message. Please try again later.");
    }
  },

  // Delete a message
  deleteMessage: async (id: string) => {
    try {
      return await prisma.message.delete({ where: { id } });
    } catch (error) {
      console.error(
        `[messageHandler] - Error deleting message (ID: ${id}):`,
        error,
      );
      throw new Error("Unable to delete message. Please try again later.");
    }
  },

  // Fetch conversation participant IDs
  getConversationParticipantIds: async (conversationId: string) => {
    try {
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { participants: true },
      });

      if (!conversation) throw new Error("Conversation not found.");

      return conversation.participants.map((participant) => participant.id);
    } catch (error) {
      console.error(
        `[messageHandler] - Error fetching participant IDs (conversationId: ${conversationId}):`,
        error,
      );
      throw new Error(
        "Unable to fetch participant IDs. Please try again later.",
      );
    }
  },

  // Fetch unread message counts by user ID
  getUnreadMessagesCount: async (userId: string) => {
    try {
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
    } catch (error) {
      console.error(
        `[messageHandler] - Error fetching unread messages count (userId: ${userId}):`,
        error,
      );
      throw new Error(
        "Unable to fetch unread message counts. Please try again later.",
      );
    }
  },
};
