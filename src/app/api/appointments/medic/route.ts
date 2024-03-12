import { NextRequest, NextResponse } from 'next/server'
import { appointmentController } from '@/app/controllers/appointment'

export async function GET( req: NextRequest,
    params: { params: { id: string } }) {
  try {
    const new_appointment = await appointmentController.get_medic_appointment(req,params)
    return NextResponse.json(new_appointment, { status: 201 })
  } catch (err: any) {
    const error_json = {
      error_message: err.error_message,
      error_message_detail: err.error_message_detail,
      error_code: err.error_code,
    }
    return NextResponse.json(error_json, { status: err.status })
  }
}