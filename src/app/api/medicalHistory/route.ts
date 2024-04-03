import { medicalHistoryController } from '@/app/controllers/medicalHistory';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
    
      const new_medical_history = await medicalHistoryController.post_medical_history(req);
      return NextResponse.json(new_medical_history, { status: 201 })
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
      // console.log('LLego al route de post user')
      const all_history_template = await medicalHistoryController.get_medical_history(req);
      return NextResponse.json(all_history_template, { status: 201 })
    } catch (err: any) {
      const error_json = {
        error_message: err.error_message,
        error_message_detail: err.error_message_detail,
        error_code: err.error_code,
      }
      return NextResponse.json(error_json, { status: err.status })
    }
  }

  export async function PUT(req: NextRequest) {
    try {
      const updated_medical_history = await medicalHistoryController.put_medical_history(req);
      return NextResponse.json(updated_medical_history, { status: 200 })
    } catch (err: any) {
      const error_json = {
        error_message: err.error_message,
        error_message_detail: err.error_message_detail,
        error_code: err.error_code,
      }
      return NextResponse.json(error_json, { status: err.status })
    }
  }