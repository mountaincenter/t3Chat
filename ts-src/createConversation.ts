import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 必要なユーザーを取得
  const users = await prisma.user.findMany({
    where: {
      name: { in: ["yama", "hiroguest", "hihihi30"] },
    },
  });

  // 名前からIDをマッピング
  const userMap = Object.fromEntries(users.map((user) => [user.name, user.id]));

  const yamaId = userMap["yama"];
  const hiroguestId = userMap["hiroguest"];
  const hihihi30Id = userMap["hihihi30"];

  if (!yamaId || !hiroguestId || !hihihi30Id) {
    throw new Error("必要なユーザーの情報が見つかりませんでした。");
  }

  // 会話 1: yama と hiroguest
  const conversation1 = await prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { every: { id: { in: [yamaId, hiroguestId] } } } },
        { participants: { none: { id: { notIn: [yamaId, hiroguestId] } } } },
      ],
    },
  });

  if (!conversation1) {
    await prisma.conversation.create({
      data: {
        isGroup: false,
        participants: {
          connect: [{ id: yamaId }, { id: hiroguestId }],
        },
      },
    });
  }

  // 会話 2: yama と hihihi30
  const conversation2 = await prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { every: { id: { in: [yamaId, hihihi30Id] } } } },
        { participants: { none: { id: { notIn: [yamaId, hihihi30Id] } } } },
      ],
    },
  });

  if (!conversation2) {
    await prisma.conversation.create({
      data: {
        isGroup: false,
        participants: {
          connect: [{ id: yamaId }, { id: hihihi30Id }],
        },
      },
    });
  }

  // 会話 3: yama のみ
  const conversation3 = await prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { every: { id: { in: [yamaId] } } } },
        { participants: { none: { id: { notIn: [yamaId] } } } },
      ],
    },
  });

  if (!conversation3) {
    await prisma.conversation.create({
      data: {
        isGroup: false,
        participants: {
          connect: [{ id: yamaId }],
        },
      },
    });
  }

  // 作成した全ての会話を出力
  const allConversations = await prisma.conversation.findMany({
    include: { participants: true },
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
