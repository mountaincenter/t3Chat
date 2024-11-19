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

  // 自分以外のユーザーリストを取得するクエリ
  listUserExcludingSelf: protectedProcedure.query(async ({ ctx }) => {
    const users = await userHandler.listUserExcludingSelf(ctx.session.user.id);
    return users;
  }),
});
