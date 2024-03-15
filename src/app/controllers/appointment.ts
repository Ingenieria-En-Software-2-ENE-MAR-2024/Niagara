import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import {
    custom_error,
    handle_error_http_response,
} from '@/app/utils/error_handler'
import { appointmentService } from '../services/appointment'
import { error_object } from '../interfaces/error'
import {
    validator_appointment_create,
    validator_appointment_update,
} from '../validators/appointment'
import { get_medical_appointment } from './medical_appointment'
import { verifyJwt } from '@/helpers/jwt'

const post_appointment = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const data = validator_appointment_create(body)

        let accessToken = headers().get('access-token')

        if (!accessToken) {
            const handle_err: error_object = handle_error_http_response(
                new Error('Unauthorized'),
                '0101',
            )
            throw new custom_error(
                handle_err.error_message,
                handle_err.error_message_detail,
                handle_err.error_code,
                handle_err.status,
            )
        }

        const new_appointment = await appointmentService.create_appointment(data)

        return new_appointment
    } catch (error: any) {
        const handle_err: error_object = handle_error_http_response(error, '0006')
        throw new custom_error(
            handle_err.error_message,
            handle_err.error_message_detail,
            handle_err.error_code,
            handle_err.status,
        )
    }
}

const get_medic_appointment = async (req: NextRequest,{ params }: { params: { id: string } }) => {
  try {
   
    const date : any= req.nextUrl.searchParams.get('date')
   
    let accessToken = headers().get('access-token')

  

    if (!accessToken) {
        const handle_err: error_object = handle_error_http_response(new Error("Unauthorized"), '0101')
        throw new custom_error(
            handle_err.error_message,
            handle_err.error_message_detail,
            handle_err.error_code,
            handle_err.status,
        )
      }

    const user_payload = verifyJwt(accessToken);
    const new_appointment = await appointmentService.read_medic_appointment(user_payload.id,date)

    return new_appointment
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


const get_patient_appointment = async (req: NextRequest,{ params }: { params: { id: string } }) => {
  try {

    const date : any= req.nextUrl.searchParams.get('date')
   
    let accessToken = headers().get('access-token')

        if (!accessToken) {
            const handle_err: error_object = handle_error_http_response(new Error("Unauthorized"), '0101')
            throw new custom_error(
                handle_err.error_message,
                handle_err.error_message_detail,
                handle_err.error_code,
                handle_err.status,
            )
        }

        const user_payload = await verifyJwt(accessToken);
  
        const new_appointment = await appointmentService.read_patient_appointment(user_payload.id,date)
    
        return new_appointment
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

const updateAppointment = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    try {
        let body = await req.json()
        const data = validator_appointment_update(body)

        const accessToken = headers().get('access-token')

        if (!accessToken) {
            const handle_err: error_object = handle_error_http_response(
                new Error('Unauthorized'),
                '0101',
            )
            throw new custom_error(
                handle_err.error_message,
                handle_err.error_message_detail,
                handle_err.error_code,
                handle_err.status,
            )
        }
        const appointmentId = parseInt(params.id)
        const appointmentUpdated = await appointmentService.updateAppointment(
            data,
            appointmentId,
        )

        return appointmentUpdated
    } catch (error: any) {
        const handle_err: error_object = handle_error_http_response(error, '0007')
        throw new custom_error(
            handle_err.error_message,
            handle_err.error_message_detail,
            handle_err.error_code,
            handle_err.status,
        )
    }
}

const deleteAppointment = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    try {
        const accessToken = headers().get('access-token')

        if (!accessToken) {
            const handle_err: error_object = handle_error_http_response(
                new Error('Unauthorized'),
                '0101',
            )
            throw new custom_error(
                handle_err.error_message,
                handle_err.error_message_detail,
                handle_err.error_code,
                handle_err.status,
            )
        }
        const appointmentId = parseInt(params.id)
        const appointmentUpdated =
            await appointmentService.deleteAppointment(appointmentId)

        return appointmentUpdated
    } catch (error: any) {
        const handle_err: error_object = handle_error_http_response(error, '0008')
        throw new custom_error(
            handle_err.error_message,
            handle_err.error_message_detail,
            handle_err.error_code,
            handle_err.status,
        )
    }
}

export const appointmentController = {
    post_appointment,
    updateAppointment,
    deleteAppointment,
    get_medic_appointment,
    get_patient_appointment
    // get_user,
    // get_users,
    // update_user,
    // delete_user,
    // update_user_password
}
