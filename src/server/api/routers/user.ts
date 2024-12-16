import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { userHandler } from "@/server/api/handlers/userHandler";

export const userRouter = createTRPCRouter({
  // 現在のユーザー情報を取得するクエリ
  getUserById: protectedProcedure.query(async ({ ctx }) => {
    const user = await userHandler.getUserById(ctx.session.user.id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }),

  // 自分を含む全ユーザーリストを取得するクエリ
  listAllUsers: protectedProcedure.query(async () => {
    const users = await userHandler.listAllUsers();
    return users;
  }),
});
