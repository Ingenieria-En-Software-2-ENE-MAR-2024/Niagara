import prisma from '../../../prisma/prisma'
import { add_property, formatDateToDb, formatDateToFront } from '../utils/utils'
import { add_object_to_array } from '../utils/utils'
import * as bcrypt from 'bcryptjs'
import {
  custom_error,
  handle_error_http_response,
} from '../utils/error_handler'
import { error_object } from '../interfaces/error'
import { verifyJwt } from '@/helpers/jwt'
import { Tappointment_create_body } from '../validators/appointment'

const create_appointment = async (body: Tappointment_create_body) => {
  try {
    // Buscamos que el paciente exista y el doctor existan

    const foundPatient = await prisma.userTest.findFirst({
      where: {
        id: body.id_patient,
        role: 'Patient',
      },
    })

    if (!foundPatient) {
      throw new Error('Patient does not exists')
    }

    const foundMedic = await prisma.medic.findFirst({
      where: {
        id: body.id_medic,
      },
    })

    if (!foundMedic) {
      throw new Error('Medic does not exists')
    }

    // Necesitamos parsear la fecha

    const date = formatDateToDb(body.date)
    console.log({date})

    
    const newAppointmentData = {
      hour: body.hour,
      date,
      id_medic: body.id_medic,
      id_patient: body.id_patient,
    }


    // Creamos la cita
    const new_appointment = await prisma.appointment.create({
      data: newAppointmentData,
    })

    if (!new_appointment) {
      throw new Error('Error creating appointment')
    }

    const appointmentFormarted = {
        id: new_appointment.id,
        hour: new_appointment.hour,
        date: formatDateToFront(new_appointment.date),
        id_medic: new_appointment.id_medic,
        id_patient: new_appointment.id_patient,
    }

    console.log({appointmentFormarted})

    return appointmentFormarted
  } catch (error) {
    throw error
  }
}

//   export const read_user = async (id: number) => {
//     try {
//       const read_user = await prisma.userTest.findFirst({
//         where: {
//           id: id,
//         },
//       })

//       if (!read_user) {
//         throw new Error('User does not exists')
//       }

//       return read_user
//     } catch (error) {
//       throw error
//     }
//   }

//   export const list_users = async (
//     search_fields?: string[],
//     search_texts?: string[],
//   ) => {
//     try {
//       let where_clause = {}
//       let users
//       if (search_fields != null && search_texts != null) {
//         if (search_fields.length > 1) {
//           let object_where: any[] = []
//           for (let i = 0; i < search_fields.length; i++) {
//             object_where = add_object_to_array(
//               object_where,
//               search_fields[i],
//               search_texts[i],
//             )
//           }
//           users = await prisma.userTest.findMany({
//             where: { AND: object_where },
//           })
//         } else {
//           add_property(where_clause, search_fields[0], search_texts[0])
//           users = await prisma.userTest.findMany({
//             where: where_clause,
//           })
//         }

//         return users
//       } else {
//         const users = await prisma.userTest.findMany({})

//         return users
//       }
//     } catch (error) {
//       throw error
//     }
//   }

//   export const delete_my_user = async (id: number) => {
//     try {
//       const delete_user = await prisma.userTest.delete({
//         where: {
//           id: id,
//         },
//       })

//       if (!delete_user) {
//         throw new Error('User does not exists')
//       }

//       return delete_user
//     } catch (error) {
//       throw error
//     }
//   }

//   export const update_my_user = async (id: number, body: user_body_update) => {
//     try {
//       const read_user = await prisma.userTest.findFirst({
//         where: {
//           id: id,
//         },
//       })

//       if (!read_user) {
//         throw new Error('User does not exists')
//       }

//       const update_user = await prisma.userTest.update({
//         where: {
//           id: id,
//         },
//         data: {
//           name: body.name,
//           role: body.role,
//         },
//       })

//       return update_user
//     } catch (error) {
//       throw error
//     }
//   }

//   export const update_my_user_password = async (
//     body: user_body_update_password,
//     token: string,
//   ) => {
//     try {
//       const userWithoutPass = verifyJwt(token)

//       if (!userWithoutPass) {
//         const handle_err: error_object = handle_error_http_response(
//           new Error('Unauthorized'),
//           '0005',
//         )
//         throw new custom_error(
//           handle_err.error_message,
//           handle_err.error_message_detail,
//           handle_err.error_code,
//           handle_err.status,
//         )
//       }

//       const user = await prisma.userTest.findFirst({
//         where: {
//           id: userWithoutPass.id,
//         },
//       })

//       if (!user) {
//         const handle_err: error_object = handle_error_http_response(
//           new Error('User not found'),
//           '0005',
//         )
//         throw new custom_error(
//           handle_err.error_message,
//           handle_err.error_message_detail,
//           handle_err.error_code,
//           handle_err.status,
//         )
//       }

//       const passwordMatches = await bcrypt.compare(
//         body.oldPassword,
//         user.password!,
//       )

//       if (passwordMatches) {
//         const hashedPassword = await bcrypt.hash(body.newPassword, 10)
//         const updatedUser = await prisma.userTest.update({
//           where: { id: user.id },
//           data: {
//             password: hashedPassword,
//           },
//         })
//         return updatedUser
//       } else {
//         const handle_err: error_object = handle_error_http_response(
//           new Error('User not found'),
//           '0005',
//         )
//         throw new custom_error(
//           handle_err.error_message,
//           handle_err.error_message_detail,
//           handle_err.error_code,
//           handle_err.status,
//         )
//       }
//     } catch (error) {
//       const handle_err: error_object = handle_error_http_response(
//         error,
//         '0005',
//       )
//       throw new custom_error(
//         handle_err.error_message,
//         handle_err.error_message_detail,
//         handle_err.error_code,
//         handle_err.status,
//       )
//     }
//   }

export const appointmentService = {
  create_appointment,
}
