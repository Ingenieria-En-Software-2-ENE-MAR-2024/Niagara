
import { NextRequest, NextResponse } from 'next/server'
import { get_user, delete_user, update_user } from '@/app/controllers/user'
import { appointmentController } from '../../../controllers/appointment';



export async function PUT(
  req: NextRequest,
  params: { params: { id: string } },
) {
  try {
    const updatedAppoitment = await appointmentController.updateAppointment(req, params)
    return NextResponse.json(updatedAppoitment, { status: 200 })
  } catch (err: any) {
    const error_json = {
      error_message: err.error_message,
      error_message_detail: err.error_message_detail,
      error_code: err.error_code,
    }
    return NextResponse.json(error_json, { status: err.status })
  }
}
