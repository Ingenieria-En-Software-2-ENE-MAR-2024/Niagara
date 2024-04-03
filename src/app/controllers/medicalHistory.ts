import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import {
    custom_error,
    handle_error_http_response,
} from '@/app/utils/error_handler'
import { error_object } from '../interfaces/error'
import { validator_history_template, validator_medic_history } from '../validators/questionary'
import { verifyJwt } from '@/helpers/jwt'
import { historyTemplateService } from '../services/historyTemplate'
import { medicalHistoryTemplateService } from '../services/medicalHistory'



const post_medical_history = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const data = validator_medic_history(body)

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
        const user_payload = verifyJwt(accessToken);
        const new_medical_history = await  medicalHistoryTemplateService.create_medical_history(user_payload.id,data)

        return new_medical_history
    } catch (error: any) {
        const handle_err: error_object = handle_error_http_response(error, '0400')
        throw new custom_error(
            handle_err.error_message,
            handle_err.error_message_detail,
            handle_err.error_code,
            handle_err.status,
        )
    }
}


const get_medical_history = async (req: NextRequest) => {
    try {
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
        const user_payload = verifyJwt(accessToken);
        const medical_history = await  medicalHistoryTemplateService.obtain_medical_history()

        return medical_history
    } catch (error: any) {
        const handle_err: error_object = handle_error_http_response(error, '0400')
        throw new custom_error(
            handle_err.error_message,
            handle_err.error_message_detail,
            handle_err.error_code,
            handle_err.status,
        )
    }
}

export const medicalHistoryController = {
    post_medical_history,
    get_medical_history,
   
}
