import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { uploadFile } from "@/server/api/handlers/uploadHandler";

// TRPCルーターの定義
export const uploadRouter = createTRPCRouter({
  uploadFile: protectedProcedure
    .input(
      z.object({
        originalFilename: z.string(),
        filepath: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const environment =
        (process.env.VERCEL_ENV as "development" | "preview" | "production") ||
        "development"; // 環境判定
      const uploadedUrl = await uploadFile(
        { originalFilename: input.originalFilename, filepath: input.filepath },
        environment,
      );

      return { url: uploadedUrl };
    }),
});
