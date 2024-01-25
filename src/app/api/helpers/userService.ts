import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserByName(userName: string) {
  const user = await prisma.user.findUnique({
    where: {
      userName: userName,
    },
  });

  return user;
}
