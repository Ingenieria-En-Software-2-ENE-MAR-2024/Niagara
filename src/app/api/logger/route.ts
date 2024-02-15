import { NextRequest, NextResponse } from 'next/server'
import { get_logs, delete_log } from '@/app/controllers/logs'

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function GET(req: NextRequest) {
  try {
    const list_logs = await get_logs(req)
    return NextResponse.json(list_logs, { status: 200 })
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
  //params: { params: { id: string } },
) {
  try {
    const params = {params : {id: req.nextUrl.searchParams.get("id")}}
    console.log(params)

    const log = await delete_log(req, params)
    return NextResponse.json(log, { status: 200 })
  } catch (err: any) {
    const error_json = {
      error_message: err.error_message,
      error_message_detail: err.error_message_detail,
      error_code: err.error_code,
    }
    return NextResponse.json(error_json, { status: err.status })
  }
}



