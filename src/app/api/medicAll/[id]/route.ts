import { NextRequest, NextResponse } from 'next/server'
import { verifyJwt } from '@/helpers/jwt'
import { medicController } from '@/app/controllers/medic'

export async function GET(
  req: NextRequest,
  params: { params: { id: string } },
) {
  try {
    const accessToken = req.headers.get('authorization')
    if (!accessToken || !verifyJwt(accessToken)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const medicFound = await medicController.getMedic(req, params)

    return NextResponse.json(medicFound, { status: 200 })
  } catch (err: any) {
    const error_json = {
      error_message: err.error_message,
      error_message_detail: err.error_message_detail,
      error_code: err.error_code,
    }
    return NextResponse.json(error_json, { status: err.status })
  }
}
