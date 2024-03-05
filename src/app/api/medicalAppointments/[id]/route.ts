
import { NextRequest, NextResponse } from 'next/server'
import { verifyJwt } from '@/helpers/jwt'
import { delete_medical_appointment, get_medical_appointment, update_medical_appointment } from '@/app/controllers/medical_appointment'





export async function GET(
    req: NextRequest,
    params: { params: { id: string } },
  ) {
    try {
      const read_medical_appointment = await get_medical_appointment(req, params)
    //  const accessToken = req.headers.get('authorization')
    //  if (!accessToken || !verifyJwt(accessToken)) {
    //    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
//}
      return NextResponse.json(read_medical_appointment, { status: 200 })
    } catch (err: any) {
      const error_json = {
        error_message: err.error_message,
        error_message_detail: err.error_message_detail,
        error_code: err.error_code,
      }
      return NextResponse.json(error_json, { status: err.status })
    }
  }



  export async function DELETE(
    req: NextRequest,
    params: { params: { id: string } },
  ) {
    try {
      const medical_appointment = await delete_medical_appointment(req, params)
      return NextResponse.json(medical_appointment, { status: 200 })
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
      const list_users = await update_medical_appointment(req, params)
      return NextResponse.json(list_users, { status: 200 })
    } catch (err: any) {
      const error_json = {
        error_message: err.error_message,
        error_message_detail: err.error_message_detail,
        error_code: err.error_code,
      }
      return NextResponse.json(error_json, { status: err.status })
    }
  }
  