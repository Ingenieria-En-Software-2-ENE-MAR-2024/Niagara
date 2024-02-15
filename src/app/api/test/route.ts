import { log_post } from '@/app/controllers/logger'
import { NextRequest, NextResponse } from 'next/server'


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

//const _post = log_post("posting to test api")
async function _post(req: NextRequest) {
  try {
    // console.log('LLego al route de post user')
    const test_object = {attr1: 1, attr2: [1,2], attr3: "a"}
    const a = NextResponse.json(test_object, { status: 201 })
    console.log(`a: ${await  a.clone().text()}`)
    return a
  } catch (err: any) {
    const error_json = {
      error_message: err.error_message,
      error_message_detail: err.error_message_detail,
      error_code: err.error_code,
    }
    return NextResponse.json(error_json, { status: err.status })
  }
}

export async function POST(req: NextRequest) {
  return log_post("posting to TEST")(req,_post);
}



