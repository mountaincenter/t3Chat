import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allMessages = await prisma.message.findMany();
  console.log(allMessages);
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
