import { NextRequest, NextResponse } from 'next/server'

import { verifyJwt } from '@/helpers/jwt'
import { get_profile, put_profile } from '@/app/controllers/profile'


export async function GET(
  req: NextRequest,
  params: { params: { id: string } },
) {
  try {
    const profile = await get_profile(req, params)
    const accessToken = req.headers.get('authorization')
    console.log(accessToken)
    if (!accessToken || !verifyJwt(accessToken))
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    
    return NextResponse.json(profile, { status: 200 })
  } catch (err: any) {
    const error_json = {
      error_message: err.error_message,
      error_message_detail: err.error_message_detail,
      error_code: err.error_code,
    }
    return NextResponse.json(error_json, { status: err.status })
  }
}


export async function PUT(
  req: NextRequest,
  params: { params: { id: string } },
) {
  try {
    await put_profile(req, params)
    return NextResponse.json({}, { status: 200 })
  } catch (err: any) {
    const error_json = {
      error_message: err.error_message,
      error_message_detail: err.error_message_detail,
      error_code: err.error_code,
    }
    return NextResponse.json(error_json, { status: err.status })
  }
}
