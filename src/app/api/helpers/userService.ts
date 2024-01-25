import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserByName(userName: string) {
  const user = await prisma.user.findUnique({
    where: {
      userName: userName,
    },
  });

  return user;
}
