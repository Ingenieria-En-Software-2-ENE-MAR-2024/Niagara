import { NextRequest } from 'next/server'
import { validator_email_body } from '../validators/email'
import { send_email } from '../services/email'
import {
  custom_error,
  handle_error_http_response,
} from '../utils/error_handler'
import { error_object } from '../interfaces/error'

export const post_email = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { credentials, data } = await validator_email_body(body)
    const email_response = await send_email(credentials, data)
    return email_response
  } catch (error) {
    const handle_err: error_object = handle_error_http_response(
      error,
      'email-0000',
    )
    throw new custom_error(
      handle_err.error_message,
      handle_err.error_message_detail,
      handle_err.error_code,
      handle_err.status,
    )
  }
}
