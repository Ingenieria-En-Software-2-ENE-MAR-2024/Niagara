import { NextRequest, NextResponse } from 'next/server'
import { appointmentController } from '@/app/controllers/appointment'

export async function POST(req: NextRequest) {
  try {
    const new_appointment = await appointmentController.post_appointment(req)
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

// export async function GET(req: NextRequest) {
//   try {
//     const list_users = await get_users(req)
//     return NextResponse.json(list_users, { status: 200 })
//   } catch (err: any) {
//     const error_json = {
//       error_message: err.error_message,
//       error_message_detail: err.error_message_detail,
//       error_code: err.error_code,
//     }
//     return NextResponse.json(error_json, { status: err.status })
//   }
// }

// export async function OPTIONS(request: NextRequest) {
//   const origin = request.headers.get('origin')

//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin': origin || '*',
//       'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   })
// }
