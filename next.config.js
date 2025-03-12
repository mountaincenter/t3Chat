/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      "via.placeholder.com",
      "picsum.photos",
      "t3chat-development.s3.ap-northeast-1.amazonaws.com",
      "wwimihupizgnfgelcxff.supabase.co",
    ], // 画像のホスト名を追加
  },
};

export default config;
