import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma'
import { verifyJwt } from '@/helpers/jwt'

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const accessToken = request.headers.get('authorization')

  if (!accessToken || !verifyJwt(accessToken)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.userTest.findUnique({
    where: {
      id: Number(id),
    },
  })

  return NextResponse.json(user)
}
