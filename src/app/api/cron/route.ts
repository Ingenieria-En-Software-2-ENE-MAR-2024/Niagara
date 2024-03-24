import { NextRequest, NextResponse } from 'next/server'
import { error_object } from '@/app/interfaces/error'
import {
  custom_error,
  handle_error_http_response,
} from '@/app/utils/error_handler'
import { update_user_password } from '@/app/controllers/user'
import { get_cronjob } from '@/app/controllers/cronjob'

export async function GET(request: NextRequest) {
  try {
    await get_cronjob()
    return NextResponse.json({message: "Cron job executed successfully."}, { status: 200 })
  } catch (err: any) {
    console.log(err)
    const error_json = {
        error_message: err.error_message,
        error_message_detail: err.error_message_detail,
        error_code: err.error_code,
      }
      return NextResponse.json(error_json, { status: err.status })
  }
}
