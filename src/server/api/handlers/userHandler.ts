import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userHandler = {
  // ユーザーIDでユーザー情報を取得
  getUserById: async (userId: string) => {
    try {
      return await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
        },
      });
    } catch (error) {
      console.error("Error fetch user:", error);
      throw new Error("Could not fetch user");
    }
  },

  // 自分を含む全てのユーザー情報を取得
  listAllUsers: async () => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
        },
      });
      return users;
    } catch (error) {
      console.error("Error listing users:", error);
      throw new Error("Could not list users");
    }
  },
};
