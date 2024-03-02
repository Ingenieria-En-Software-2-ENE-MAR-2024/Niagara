import prisma from '../../../../prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'
import * as bcrypt from 'bcryptjs'
import { signJwtAccessToken, verifyJwt } from '@/helpers/jwt'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { error_object } from '@/app/interfaces/error'
import { custom_error, handle_error_http_response } from '@/app/utils/error_handler'
import { update_user_password } from '@/app/controllers/user'




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
   
    const updatedUser = await update_user_password(request)
    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    const handle_err: error_object = handle_error_http_response(
      new Error('User not found'),
      '0005',
    )
    throw new custom_error(
      handle_err.error_message,
      handle_err.error_message_detail,
      handle_err.error_code,
      handle_err.status,
    )
  }
}
