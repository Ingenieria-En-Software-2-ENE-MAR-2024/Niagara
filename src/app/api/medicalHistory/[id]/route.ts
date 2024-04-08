import { NextRequest, NextResponse } from "next/server";
import { medicalHistoryController } from '@/app/controllers/medicalHistory';

export async function GET(req: NextRequest, params: { params: { id: string } }) {
  try {
    // console.log('LLego al route de post user')
    const { params: { id } } = params
    const history_template = await medicalHistoryController.get_medical_history(req, id);
    return NextResponse.json(history_template, { status: 201 })
  } catch (err: any) {
    const error_json = {
      error_message: err.error_message,
      error_message_detail: err.error_message_detail,
      error_code: err.error_code,
    }
    return NextResponse.json(error_json, { status: err.status })
  }
}