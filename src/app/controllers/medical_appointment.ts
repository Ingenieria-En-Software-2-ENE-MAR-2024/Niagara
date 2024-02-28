import { NextRequest, NextResponse } from 'next/server'
import { error_object } from '../interfaces/error'
import { custom_error, handle_error_http_response } from '../utils/error_handler'
import { create_medical_appointment, delete_my_medical_appointment, list_medical_appointments, read_medical_appointment, update_my_medical_appointment } from '../services/medical_appointment'



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


  export const get_medical_appointment = async (
    req: NextRequest,
    { params }: { params: { id: string } },
  ) => {
    try {
      let user
      let prams_id = params.id
      let id = parseInt(prams_id)
      user = await read_medical_appointment(id)
  
      return user
    } catch (error: any) {
      const handle_err: error_object = handle_error_http_response(error, '4001')
      throw new custom_error(
        handle_err.error_message,
        handle_err.error_message_detail,
        handle_err.error_code,
        handle_err.status,
      )
    }
  }
  


  export const get_medical_appointments = async (req: NextRequest) => {
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
  
        users = await list_medical_appointments(search_fields, search_texts)
      } else {
        users = await list_medical_appointments()
      }
  
      return users
    } catch (error: any) {
      const handle_err: error_object = handle_error_http_response(error, '4002')
      throw new custom_error(
        handle_err.error_message,
        handle_err.error_message_detail,
        handle_err.error_code,
        handle_err.status,
      )
    }
  }


  export const update_medical_appointment = async (
    req: NextRequest,
    { params }: { params: { id: string } },
  ) => {
    try {
   //  let body = await req.json()
    //  const data = validator_user_update(body)
      let medical_appointment
      let prams_id = params.id
      let id = parseInt(prams_id)
      medical_appointment = await update_my_medical_appointment(id)
  
      return medical_appointment
    } catch (error: any) {
      const handle_err: error_object = handle_error_http_response(error, '4003')
      throw new custom_error(
        handle_err.error_message,
        handle_err.error_message_detail,
        handle_err.error_code,
        handle_err.status,
      )
    }
  }


  export const delete_medical_appointment = async (
    req: NextRequest,
    { params }: { params: { id: string } },
  ) => {
    try {
      // console.log({ params })
      let user
      let prams_id = params.id
      let id = parseInt(prams_id)
      user = await delete_my_medical_appointment(id)
  
      return user
    } catch (error: any) {
      const handle_err: error_object = handle_error_http_response(error, '4004')
      throw new custom_error(
        handle_err.error_message,
        handle_err.error_message_detail,
        handle_err.error_code,
        handle_err.status,
      )
    }
  }
  
 