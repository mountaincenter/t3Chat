import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.messageRead.deleteMany(), // MessageReadを削除
    prisma.file.deleteMany(), // Fileも削除する場合
    prisma.message.deleteMany(), // Messageを削除
  ]);

  console.log("All related messages and dependencies have been deleted.");
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
