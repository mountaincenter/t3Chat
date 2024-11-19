import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userHandler = {
  // ユーザーIDでユーザー情報を取得
  getUserById: async (userId: string) => {
    try {
      return await prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (error) {
      console.error("Error fetch user:", error);
      throw new Error("Could not fetch user");
    }
  },

  // 自分以外のユーザーリストを取得
  listUserExcludingSelf: async (userId: string) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          id: { not: userId },
        },
      });
      return users;
    } catch (error) {
      console.error("Error listing users:", error);
      throw new Error("Could not list users");
    }
  },
};
