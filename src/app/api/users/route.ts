import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '../../../../prisma/prisma'
import * as bcrypt from 'bcryptjs'

z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newUser = await prisma.userTest.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  const { password, ...userWithoutPass } = newUser

  return NextResponse.json(userWithoutPass, { status: 201 })
}
