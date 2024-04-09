import { NextRequest, NextResponse } from 'next/server'
import { medicController } from '@/app/controllers/medic'
import { verifyJwt } from '@/helpers/jwt'
import { patientController } from '@/app/controllers/patient'

export async function GET(req: NextRequest) {
  try {
    const patients = await patientController.getPatients(req)
    return NextResponse.json(patients, { status: 200 })
  } catch (err: any) {
    const error_json = {
      error_message: err.error_message,
      error_message_detail: err.error_message_detail,
      error_code: err.error_code,
    }
    return NextResponse.json(error_json, { status: err.status })
  }
}
