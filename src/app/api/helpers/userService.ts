import prisma from "../../../../prisma/prisma";

export const getUserByName = async (username: string) => {
  const user = await prisma.userTest.findUnique({
    where: {
      id: 1,
      username: username,
    },
  });
  return user;
};
