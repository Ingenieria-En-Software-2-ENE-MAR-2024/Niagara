import { historyTemplateController } from '@/app/controllers/historyTemplate'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
      // console.log('LLego al route de post user')
      const new_history_template = await historyTemplateController.post_history_template(req);
      return NextResponse.json(new_history_template, { status: 201 })
    } catch (err: any) {
      const error_json = {
        error_message: err.error_message,
        error_message_detail: err.error_message_detail,
        error_code: err.error_code,
      }
      return NextResponse.json(error_json, { status: err.status })
    }
  }