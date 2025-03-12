import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { uploadFile } from "@/server/api/handlers/uploadHandler";

// TRPCルーターの定義
export const uploadRouter = createTRPCRouter({
  uploadFile: protectedProcedure
    .input(
      z.object({
        originalFilename: z.string(),
        fileBuffer: z.instanceof(Buffer),
      }),
    )
    .mutation(async ({ input }) => {
      const environment =
        (process.env.VERCEL_ENV as "development" | "preview" | "production") ||
        "development"; // 環境判定
      const uploadedUrl = await uploadFile(
        {
          originalFilename: input.originalFilename,
          fileBuffer: input.fileBuffer,
        },
        environment,
      );

      return { url: uploadedUrl };
    }),
});
