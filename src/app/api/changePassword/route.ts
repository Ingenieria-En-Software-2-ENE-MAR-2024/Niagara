import prisma from '../../../../prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'
import * as bcrypt from 'bcryptjs'
import { signJwtAccessToken, verifyJwt } from '@/helpers/jwt'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { headers } from 'next/headers'

interface RequestBody {
  oldPassword: string
  newPassword: string
  compareNewPassword: string
}


// const userWithoutPass: {
//     id: number;
//     name: string;
//     email: string | null;
//     role: string | null;
//     createdAt: Date;
//     updatedAt: Date;
//     deletedAt: Date | null;
// }

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json()

    // Then use it like this
    let accessToken = headers().get('access-token')


    if (!accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userWithoutPass = verifyJwt(accessToken)

    if (!userWithoutPass) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 401 })
    }

    const user = await prisma.userTest.findFirst({
      where: {
        id: userWithoutPass.id,
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Incorrect email or password' },
        { status: 401 },
      )
    }

    if (body.oldPassword && user.password) {
      const passwordMatches = await bcrypt.compare(
        body.oldPassword,
        user.password,
      )

      if (passwordMatches) {
        const hashedPassword = await bcrypt.hash(body.newPassword, 10)
        const updatedUser = await prisma.userTest.update({
          where: { id: user.id },
          data: {
            password: hashedPassword,
          },
        })
        return new NextResponse(JSON.stringify(updatedUser))
      } else
        return NextResponse.json(
          { message: 'Incorrect validation information' },
          { status: 401 },
        )
    }
  } catch (error) {
    throw new Error('An unexpected error occurred.')
  }
}
