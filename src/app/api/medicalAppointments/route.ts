import { NextRequest, NextResponse } from 'next/server'
import { get_medical_appointments, post_medical_appointment } from '@/app/controllers/medical_appointment'

export async function POST(req: NextRequest) {
    try {
      const new_medical_appointment = await post_medical_appointment (req)
      return NextResponse.json(new_medical_appointment, { status: 201 })
    } catch (err: any) {
      const error_json = {
        error_message: err.error_message,
        error_message_detail: err.error_message_detail,
        error_code: err.error_code,
      }
      return NextResponse.json(error_json, { status: err.status })
    }
  }


  export async function GET(req: NextRequest) {
    try {
      const list_medical_appointments = await get_medical_appointments(req)
      return NextResponse.json(list_medical_appointments, { status: 200 })
    } catch (err: any) {
      const error_json = {
        error_message: err.error_message,
        error_message_detail: err.error_message_detail,
        error_code: err.error_code,
      }
      return NextResponse.json(error_json, { status: err.status })
    }
  }
  