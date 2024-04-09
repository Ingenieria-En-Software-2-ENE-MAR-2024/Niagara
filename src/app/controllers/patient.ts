import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import {
  validator_user_create,
  validator_user_update_password_body,
} from '@/app/validators/user'
import {
  custom_error,
  handle_error_http_response,
} from '@/app/utils/error_handler'
import {
  create_user,
  list_users,
  read_user,
  delete_my_user,
  update_my_user,
  update_my_user_password,
} from '../services/user'
import { error_object } from '../interfaces/error'
import { validator_user_update } from '@/app/validators/user'
import { patientService } from '../services/patient'

const getPatients = async (req: NextRequest) => {
  try {
    const patients = await patientService.getPatients()
    return patients
  } catch (error: any) {
    const handle_err: error_object = handle_error_http_response(error, '0010')
    throw new custom_error(
      handle_err.error_message,
      handle_err.error_message_detail,
      handle_err.error_code,
      handle_err.status,
    )
  }
}

export const patientController = {
  getPatients,
}
