import prisma from '../../prisma/prisma'

export const getUserByName = async (name: string) => {
  const user = await prisma.userTest.findUnique({
    where: {
      id: 1,
      name: name,
    },
  })
  return user
}
