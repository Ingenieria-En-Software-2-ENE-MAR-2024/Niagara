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
import { medicService } from '../services/medic'

const getMedic = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    let prams_id = params.id
    let id = parseInt(prams_id)
    let medic = await medicService.getMedic(id)

    return medic
  } catch (error: any) {
    const handle_err: error_object = handle_error_http_response(error, '0009')
    throw new custom_error(
      handle_err.error_message,
      handle_err.error_message_detail,
      handle_err.error_code,
      handle_err.status,
    )
  }
}

const getMedics = async (req: NextRequest) => {
  try {
    const medics = await medicService.getMedics()

    return medics
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

export const medicController = {
  getMedic,
  getMedics,
}
