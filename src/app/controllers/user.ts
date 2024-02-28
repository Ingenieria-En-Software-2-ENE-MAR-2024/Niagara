import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { validator_user_create, validator_user_update_password_body } from '@/app/validators/user'
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

export const post_user = async (req: NextRequest) => {
  try {
    // console.log('Llego al controlador')
    const body = await req.json()
    const data = validator_user_create(body)
    const new_user = await create_user(data)

    return new_user
  } catch (error: any) {
    const handle_err: error_object = handle_error_http_response(error, '0000')
    throw new custom_error(
      handle_err.error_message,
      handle_err.error_message_detail,
      handle_err.error_code,
      handle_err.status,
    )
  }
}

export const get_user = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    let user
    let prams_id = params.id
    let id = parseInt(prams_id)
    user = await read_user(id)

    return user
  } catch (error: any) {
    const handle_err: error_object = handle_error_http_response(error, '0001')
    throw new custom_error(
      handle_err.error_message,
      handle_err.error_message_detail,
      handle_err.error_code,
      handle_err.status,
    )
  }
}

export const get_users = async (req: NextRequest) => {
  try {
    let users
    const search_field = req.nextUrl.searchParams.get('search_field')
    const search_text = req.nextUrl.searchParams.get('search_text')
    if (
      (search_field != null && !search_text) ||
      (!search_field && search_text != null)
    ) {
      throw new Error(
        'both parameters (search_field and search_text) must be provided',
      )
    }

    if (search_field != null && search_text != null) {
      let search_fields = []
      let search_texts = []
      search_fields = search_field.toString().includes(',')
        ? search_field.toString().split(',')
        : [search_field.toString()]
      search_texts = search_text.toString().includes(',')
        ? search_text.toString().split(',')
        : [search_text.toString()]

      if (search_fields.length !== search_texts.length) {
        throw new Error(
          'The search_field and search_text parameters must have the same number of elements.',
        )
      }

      users = await list_users(search_fields, search_texts)
    } else {
      users = await list_users()
    }

    return users
  } catch (error: any) {
    const handle_err: error_object = handle_error_http_response(error, '0002')
    throw new custom_error(
      handle_err.error_message,
      handle_err.error_message_detail,
      handle_err.error_code,
      handle_err.status,
    )
  }
}

export const update_user = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    let body = await req.json()
    const data = validator_user_update(body)
    let user
    let prams_id = params.id
    let id = parseInt(prams_id)
    user = await update_my_user(id, data)

    return user
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

export const delete_user = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    // console.log({ params })
    let user
    let prams_id = params.id
    let id = parseInt(prams_id)
    user = await delete_my_user(id)

    return user
  } catch (error: any) {
    const handle_err: error_object = handle_error_http_response(error, '0004')
    throw new custom_error(
      handle_err.error_message,
      handle_err.error_message_detail,
      handle_err.error_code,
      handle_err.status,
    )
  }
}


export const update_user_password = async (
  req: NextRequest,
) => {
  try {
    // console.log({ params })
    const body = await req.json()

    // Then use it like this
    let accessToken = headers().get('access-token')

    if (!body) {
      const handle_err: error_object = handle_error_http_response(new Error("Body not found on request"), '0100')
      throw new custom_error(
        handle_err.error_message,
        handle_err.error_message_detail,
        handle_err.error_code,
        handle_err.status,
      )
    }
    if (!accessToken) {
      const handle_err: error_object = handle_error_http_response(new Error("Unauthorized"), '0101')
      throw new custom_error(
        handle_err.error_message,
        handle_err.error_message_detail,
        handle_err.error_code,
        handle_err.status,
      )
    }

    const validatedBody = validator_user_update_password_body(body)

    const updatedUser = await update_my_user_password(validatedBody, accessToken)

    return updatedUser
  } catch (error: any) {
    const handle_err: error_object = handle_error_http_response(error, '0004')
    throw new custom_error(
      handle_err.error_message,
      handle_err.error_message_detail,
      handle_err.error_code,
      handle_err.status,
    )
  }
}