import {
  custom_error,
  handle_error_http_response,
} from '@/app/utils/error_handler'
import { error_object } from '../interfaces/error'
import { execute_cronjob } from '../services/cronjob'

export const get_cronjob = async () => {
  try {
    await execute_cronjob()
  } catch (error: any) {
    const handle_err: error_object = handle_error_http_response(error, '0003')
    throw new custom_error(
      handle_err.error_message,
      handle_err.error_message_detail,
      handle_err.error_code,
      handle_err.status,
    )
  }
}
