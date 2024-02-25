import { NextRequest, NextResponse } from 'next/server'
import { post_medical_appointment } from '@/app/controllers/medical_appointment'

export async function POST(req: NextRequest) {
    try {
      // console.log('LLego al route de post user')
      const new_user = await post_medical_appointment (req)
      return NextResponse.json(new_user, { status: 201 })
    } catch (err: any) {
      const error_json = {
        error_message: err.error_message,
        error_message_detail: err.error_message_detail,
        error_code: err.error_code,
      }
      return NextResponse.json(error_json, { status: err.status })
    }
  }