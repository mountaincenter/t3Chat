import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Prisma からユーザーを取得
  const users = await prisma.user.findMany({
    where: {
      name: { in: ["yama", "hiroguest", "hihihi30"] },
    },
  });

  // ユーザー名から ID をマッピング
  const userMap = Object.fromEntries(users.map((user) => [user.name, user.id]));

  // conversation を作成するための組み合わせ
  const combinations = [
    { participants: ["yama", "hiroguest"] },
    { participants: ["yama", "hihihi30"] },
    { participants: ["yama"] },
  ];

  // conversation の作成
  for (const combination of combinations) {
    // 他の組み合わせのconversationを作成
    if (combination.participants.length === 1) {
      // `yama` のみの場合は常に新しい `Conversation` を作成
      await prisma.conversation.create({
        data: {
          isGroup: false, // isGroup を常に false に設定
          participants: {
            connect: combination.participants.map((name) => ({
              id: userMap[name], // ユーザー名に基づいて ID を取得し接続
            })),
          },
        },
      });
    } else {
      // 複数参加者の場合は既存チェック
      const existingConversation = await prisma.conversation.findFirst({
        where: {
          AND: [
            {
              participants: {
                every: {
                  id: {
                    in: combination.participants.map((name) => userMap[name]),
                  },
                },
              },
            },
            {
              participants: {
                none: {
                  id: {
                    notIn: combination.participants.map(
                      (name) => userMap[name],
                    ),
                  },
                },
              },
            },
          ],
        },
      });

      if (!existingConversation) {
        await prisma.conversation.create({
          data: {
            isGroup: false, // isGroup を常に false に設定
            participants: {
              connect: combination.participants.map((name) => ({
                id: userMap[name], // ユーザー名に基づいて ID を取得し接続
              })),
            },
          },
        });
      }
    }
  }

  // 作成した conversation を取得してログに出力
  const allConversations = await prisma.conversation.findMany({
    include: {
      participants: true, // 参加者情報を含める
    },
  });

  console.log(allConversations);
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
