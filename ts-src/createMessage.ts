import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 指定された範囲の日付を生成
function generateTimestamps(
  count: number,
  startDate: Date,
  endDate: Date,
): Date[] {
  const timestamps: Date[] = [];
  const interval = (endDate.getTime() - startDate.getTime()) / count;

  for (let i = 0; i < count; i++) {
    timestamps.push(new Date(startDate.getTime() + i * interval));
  }

  return timestamps;
}

async function main() {
  // 既存の Conversations を取得
  const conversations = await prisma.conversation.findMany({
    include: { participants: true },
  });

  if (conversations.length === 0) {
    console.error("No conversations found. Please create them first.");
    return;
  }

  // メッセージタイムスタンプ生成
  const startDate = new Date("2023-10-01T00:00:00Z");
  const endDate = new Date();
  const timestamps = generateTimestamps(30, startDate, endDate);

  // サンプルメッセージデータ (30件)
  const messages = [
    {
      content: "こちらの写真をご覧ください！",
      files: ["https://picsum.photos/150", "https://picsum.photos/200"],
      senderName: "yama",
    },
    {
      content: "今日は忙しかったです。",
      files: ["https://picsum.photos/230/150"],
      senderName: "hiroguest",
    }, // 横長
    {
      content: "新しいプロジェクトが始まりました！",
      files: ["https://picsum.photos/170", "https://picsum.photos/210"],
      senderName: "hihihi30",
    },
    {
      content: "こちらの画像も見てください。",
      files: ["https://picsum.photos/200/300"],
      senderName: "yama",
    }, // 縦長
    {
      content: "週末はどこに行きますか？",
      files: ["https://picsum.photos/250"],
      senderName: "hiroguest",
    },
    {
      content: "旅行に行きたいですね！",
      files: ["https://picsum.photos/400/300"],
      senderName: "hihihi30",
    }, // 横長
    {
      content: "プロジェクトの進捗はいかがですか？",
      files: ["https://picsum.photos/300/500"],
      senderName: "yama",
    }, // 縦長
    {
      content: "ランチは何を食べましたか？",
      files: ["https://picsum.photos/220"],
      senderName: "hiroguest",
    },
    {
      content: "写真を添付します。",
      files: ["https://picsum.photos/400/200"],
      senderName: "hihihi30",
    }, // 横長
    {
      content: "素敵な景色を見ました！",
      files: ["https://picsum.photos/400", "https://picsum.photos/450"],
      senderName: "yama",
    },
    {
      content: "天気が良いですね。",
      files: ["https://picsum.photos/500/400"],
      senderName: "hiroguest",
    }, // 横長
    {
      content: "新しいアイデアを共有します。",
      files: ["https://picsum.photos/280"],
      senderName: "hihihi30",
    },
    {
      content: "イベントに参加しますか？",
      files: ["https://picsum.photos/320/480"],
      senderName: "yama",
    }, // 縦長
    {
      content: "会議は何時からですか？",
      files: ["https://picsum.photos/300/150"],
      senderName: "hiroguest",
    }, // 横長
    {
      content: "ドキュメントを送信しました。",
      files: ["https://picsum.photos/350"],
      senderName: "hihihi30",
    },
    { content: "明日の予定を教えてください。", files: [], senderName: "yama" },
    {
      content: "写真を整理しています。",
      files: ["https://picsum.photos/360/720"],
      senderName: "hiroguest",
    }, // 縦長
    {
      content: "今日の締め切りについて話しましょう。",
      files: ["https://picsum.photos/400/200"],
      senderName: "hihihi30",
    }, // 横長
    {
      content: "最近のニュースを見ましたか？",
      files: ["https://picsum.photos/420"],
      senderName: "yama",
    },
    {
      content: "タスクが完了しました。",
      files: ["https://picsum.photos/450/600"],
      senderName: "hiroguest",
    }, // 縦長
    {
      content: "報告書を作成中です。",
      files: ["https://picsum.photos/480"],
      senderName: "hihihi30",
    },
    {
      content: "休日の予定を決めました！",
      files: ["https://picsum.photos/600/450"],
      senderName: "yama",
    }, // 横長
    { content: "この本を読んでいます。", files: [], senderName: "hiroguest" },
    {
      content: "新しいアプリを試しましたか？",
      files: ["https://picsum.photos/520"],
      senderName: "hihihi30",
    },
    {
      content: "来月のスケジュールを確認してください。",
      files: ["https://picsum.photos/300/600"],
      senderName: "yama",
    }, // 縦長
    {
      content: "メッセージを送信しました。",
      files: ["https://picsum.photos/540"],
      senderName: "hiroguest",
    },
    {
      content: "プレゼン資料を共有します。",
      files: ["https://picsum.photos/550/350"],
      senderName: "hihihi30",
    }, // 横長
    {
      content: "新しいタスクを追加しました。",
      files: ["https://picsum.photos/580"],
      senderName: "yama",
    },
    {
      content: "写真の編集を終えました。",
      files: ["https://picsum.photos/150/250"],
      senderName: "hiroguest",
    }, // 縦長
    {
      content: "この画像をご覧ください。",
      files: ["https://picsum.photos/600"],
      senderName: "hihihi30",
    },
  ];

  // メッセージを作成
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const timestamp = timestamps[i];

    if (!message) {
      console.warn(`Skipping undefined message at index ${i}`);
      continue;
    }

    for (const conversation of conversations) {
      const sender = conversation.participants.find(
        (participant) => participant.name === message.senderName,
      );

      if (!sender) {
        console.warn(
          `Skipping message: Sender '${message.senderName}' is not a participant of conversation '${conversation.id}'`,
        );
        continue;
      }

      // メッセージ作成
      const createdMessage = await prisma.message.create({
        data: {
          content: message.content,
          senderId: sender.id,
          conversationId: conversation.id,
          timestamp,
          files: {
            create: message.files.map((url) => ({
              url,
              fileType: "IMAGE",
            })),
          },
        },
        include: { files: true },
      });

      console.log(`Created Message:`, createdMessage);

      // Read レコードを作成 (全ての参加者を既読状態にする)
      for (const participant of conversation.participants) {
        await prisma.messageRead.create({
          data: {
            userId: participant.id,
            messageId: createdMessage.id,
          },
        });
      }
    }
  }

  console.log("Messages with timestamps have been successfully created.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
