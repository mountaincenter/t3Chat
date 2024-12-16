| **Environment** | **Type**                 | **Database**        | **Deployment (Host)**                                                                    | **File Upload**     | **Pusher Channel**          |
| --------------- | ------------------------ | ------------------- | ---------------------------------------------------------------------------------------- | ------------------- | --------------------------- |
| **Development** | Local Development        | PostgreSQL (Docker) | [Localhost](http://localhost:3000)<br><small>(ローカル環境)</small>                      | Local Storage       | `top-atoll-683-development` |
| **Preview**     | Staging / Vercel Preview | Supabase            | [Vercel Preview](https://<your-app>-preview.vercel.app)<br><small>(自動デプロイ)</small> | Supabase Storage    | `top-atoll-683-staging`     |
| **Production**  | Production / Live        | Vercel Storage      | [ymnk.jp](https://ymnk.jp)<br><small>(独自ドメイン)</small>                              | Vercel Blob Storage | `top-atoll-683-production`  |

| **ファイル**          | **主な責務**                         |
| --------------------- | ------------------------------------ |
| `pusherService.ts`    | Pusherインスタンス管理とイベント通知 |
| `messageHandler.ts`   | DB操作とPusherトリガー呼び出し       |
| `message.ts` (Router) | APIルーター定義とデータ検証          |
