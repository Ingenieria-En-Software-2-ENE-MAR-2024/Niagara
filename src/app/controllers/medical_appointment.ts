import { NextRequest, NextResponse } from 'next/server'
import { error_object } from '../interfaces/error'
import { custom_error, handle_error_http_response } from '../utils/error_handler'
import { create_medical_appointment } from '../services/medical_appointment'



export const post_medical_appointment = async (req: NextRequest) => {
    try {
      
      const body = await req.json()
    //  const data = validator_user_create(body)
     const new_medical_appointment = await create_medical_appointment(body)
  
      return new_medical_appointment
    } catch (error: any) {
      const handle_err: error_object = handle_error_http_response(error, '4000')
      throw new custom_error(
        handle_err.error_message,
        handle_err.error_message_detail,
        handle_err.error_code,
        handle_err.status,
      )
    }
  }
  