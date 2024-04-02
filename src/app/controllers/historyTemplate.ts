import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import {
    custom_error,
    handle_error_http_response,
} from '@/app/utils/error_handler'
import { error_object } from '../interfaces/error'
import { validator_history_template } from '../validators/questionary'
import { verifyJwt } from '@/helpers/jwt'
import { historyTemplateService } from '../services/historyTemplate'



const post_history_template = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const data = validator_history_template(body)

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
        const new_historyTemplate = await  historyTemplateService.create_history_template(user_payload.id,data)

        return  new_historyTemplate;
    } catch (error: any) {
        const handle_err: error_object = handle_error_http_response(error, '0300')
        throw new custom_error(
            handle_err.error_message,
            handle_err.error_message_detail,
            handle_err.error_code,
            handle_err.status,
        )
    }
}


export const historyTemplateController = {
    post_history_template,
   
}
