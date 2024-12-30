import { PrismaClient, type FileType } from "@prisma/client";

const prisma = new PrismaClient();

export const messageHandler = {
  // 会話IDでメッセージを取得
  getMessageByConversationId: async (conversationId: string) => {
    try {
      return await prisma.message.findMany({
        where: { conversationId },
        include: {
          sender: true, // メッセージの送信者情報を含める
          files: true, // ファイルも含める
          readBy: true, // 既読ユーザー情報を含める
        },
        orderBy: { timestamp: "asc" },
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw new Error("Could not fetch messages");
    }
  },

  // メッセージの作成
  createMessage: async (messageData: {
    content: string;
    conversationId: string;
    senderId: string;
    files?: { url: string; fileType: FileType }[];
  }) => {
    try {
      // 会話を取得して、1対1会話かグループ会話かを確認
      const conversation = await prisma.conversation.findUnique({
        where: { id: messageData.conversationId },
        include: { participants: true },
      });

      if (!conversation) {
        throw new Error("会話が見つかりませんでした");
      }

      // メッセージの作成
      const newMessage = await prisma.message.create({
        data: {
          content: messageData.content,
          sender: { connect: { id: messageData.senderId } },
          conversation: { connect: { id: messageData.conversationId } },
          files: {
            create: messageData.files?.map((file) => ({
              url: file.url,
              fileType: file.fileType,
            })),
          },
        },
        include: {
          files: true, // ファイルも含める
          sender: true, // 送信者情報を含める
        },
      });

      return newMessage;
    } catch (error) {
      console.error("Error creating message:", error);
      throw new Error("Could not create message");
    }
  },

  // メッセージの更新
  updateMessage: async (id: string, content: string) => {
    try {
      return await prisma.message.update({
        where: { id },
        data: { content },
      });
    } catch (error) {
      console.error("Error updating message:", error);
      throw new Error("Could not update message");
    }
  },

  // メッセージの削除
  deleteMessage: async (id: string) => {
    try {
      return await prisma.message.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      throw new Error("Could not delete message");
    }
  },
  // メッセージを既読としてマーク
  markMessageAsRead: async (messageId: string, userId: string) => {
    try {
      return await prisma.message.update({
        where: { id: messageId },
        data: {
          readBy: {
            connect: { id: userId },
          },
        },
      });
    } catch (error) {
      console.error("Error marking message as read:", error);
      throw new Error("Could not mark message as read");
    }
  },

  // 会話の参加者IDを取得
  getConversationParticipantIds: async (conversationId: string) => {
    try {
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { participants: true },
      });

      if (!conversation) {
        throw new Error("会話が見つかりませんでした");
      }

      return conversation.participants.map((participant) => participant.id);
    } catch (error) {
      console.error("Error fetching conversation participant IDs:", error);
      throw new Error("Could not fetch conversation participant IDs");
    }
  },

  // 未読メッセージの数を取得
  getUnreadMessagesCount: async (userId: string) => {
    try {
      const conversations = await prisma.conversation.findMany({
        where: {
          participants: {
            some: { id: userId },
          },
        },
        include: {
          messages: {
            where: {
              readBy: {
                none: { id: userId },
              },
              senderId: {
                not: userId, // 自分が送信したメッセージは未読数にカウントしない
              },
            },
          },
        },
      });

      // 会話ごとの未読数を返す
      const unreadCounts = conversations.map((conversation) => ({
        conversationId: conversation.id,
        unreadCount: conversation.messages.length,
      }));

      return unreadCounts;
    } catch (error) {
      console.error("Error fetching unread messages count:", error);
      throw new Error("Could not fetch unread messages count");
    }
  },
};
