import fs from "fs/promises";
import { supabase } from "@/lib/supabaseClient";
import { generateTimestamp } from "@/lib/utils";
import { put } from "@vercel/blob";

// 新しい型を定義
interface UploadFile {
  originalFilename: string;
  filepath: string;
}

// ファイルアップロード処理
export const uploadFile = async (
  file: UploadFile,
  environment: "development" | "preview" | "production",
): Promise<string> => {
  const timestamp = generateTimestamp();
  const fileName = `${timestamp}_${file.originalFilename}`;

  if (environment === "development") {
    // ローカル開発環境では public/uploads ディレクトリに保存
    const localPath = `./public/uploads/${fileName}`;
    await fs.copyFile(file.filepath, localPath);
    return `/uploads/${fileName}`;
  } else if (environment === "preview") {
    // プレビュー環境では Supabase Storage を使用
    const { error } = await supabase.storage
      .from("uploads")
      .upload(`images/${fileName}`, file.filepath, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase Upload Error:", error);
      throw new Error("Failed to upload file to Supabase.");
    }

    const { data: publicUrlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(`images/${fileName}`);

    if (!publicUrlData?.publicUrl) {
      throw new Error("Failed to retrieve public URL from Supabase.");
    }

    return publicUrlData.publicUrl;
  } else if (environment === "production") {
    // 本番環境では Vercel Blob を使用
    const blob = await put(fileName, await fs.readFile(file.filepath), {
      access: "public",
    });

    return blob.url; // 公開URLを返す
  }

  throw new Error("Invalid environment configuration.");
};
