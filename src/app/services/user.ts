import {
  user_body_create,
  user_body_update,
  user_body_update_password,
} from '../interfaces/user'
import prisma from '../../../prisma/prisma'
import { add_property } from '../utils/utils'
import { add_object_to_array } from '../utils/utils'
import * as bcrypt from 'bcryptjs'
import {
  custom_error,
  handle_error_http_response,
} from '../utils/error_handler'
import { error_object } from '../interfaces/error'
import { verifyJwt } from '@/helpers/jwt'
import { BorderAll } from '@mui/icons-material'

export const create_user = async (body: user_body_create) => {
  try {

    if(body.role?.toLowerCase() === "medic" && body.speciality===undefined){
      throw new Error('Need specify the specialy')
    }

    const new_user = await prisma.userTest.create({
      data: {
        name: body.name,
        email: body.email ?? '',
        ci: body.ci,
        password: await bcrypt.hash(body.password, 10),
        role: body.role,
      },
    })

    if (body.role?.toLowerCase() === "medic" && body.speciality!==undefined) {
      await prisma.medic.create({
        data: {
          medic_id: new_user.id,
          speciality: body.speciality
        }
      })
    }

    if (body.role?.toLowerCase() === "patient") {
      await prisma.patient.create({
        data: {
          patient_id: new_user.id
        }
      })
    }

    const { password, ...userWithoutPass } = new_user

    return userWithoutPass
  } catch (error) {
    throw error
  }
}

export const read_user = async (id: number) => {
  try {
    const read_user = await prisma.userTest.findFirst({
      where: {
        id: id,
      },
    })

    if (!read_user) {
      throw new Error('User does not exists')
    }

    return read_user
  } catch (error) {
    throw error
  }
}

export const list_users = async (
  search_fields?: string[],
  search_texts?: string[],
) => {
  try {
    let where_clause = {}
    let users
    if (search_fields != null && search_texts != null) {
      if (search_fields.length > 1) {
        let object_where: any[] = []
        for (let i = 0; i < search_fields.length; i++) {
          object_where = add_object_to_array(
            object_where,
            search_fields[i],
            search_texts[i],
          )
        }
        users = await prisma.userTest.findMany({
          where: { AND: object_where },
        })
      } else {
        add_property(where_clause, search_fields[0], search_texts[0])
        users = await prisma.userTest.findMany({
          where: where_clause,
        })
      }

      return users
    } else {
      const users = await prisma.userTest.findMany({})

      return users
    }
  } catch (error) {
    throw error
  }
}

export const delete_my_user = async (id: number) => {
  try {
    const delete_user = await prisma.userTest.delete({
      where: {
        id: id,
      },
    })

    if (!delete_user) {
      throw new Error('User does not exists')
    }

    return delete_user
  } catch (error) {
    throw error
  }
}

export const update_my_user = async (id: number, body: user_body_update) => {
  try {
    const read_user = await prisma.userTest.findFirst({
      where: {
        id: id,
      },
    })

    if (!read_user) {
      throw new Error('User does not exists')
    }

    const update_user = await prisma.userTest.update({
      where: {
        id: id,
      },
      data: {
        name: body.name
      },
    })

    return update_user
  } catch (error) {
    throw error
  }
}

export const update_my_user_password = async (
  body: user_body_update_password,
  token: string,
) => {
  try {
    const userWithoutPass = verifyJwt(token)

    if (!userWithoutPass) {
      const handle_err: error_object = handle_error_http_response(
        new Error('Unauthorized'),
        '0005',
      )
      throw new custom_error(
        handle_err.error_message,
        handle_err.error_message_detail,
        handle_err.error_code,
        handle_err.status,
      )
    }

    const user = await prisma.userTest.findFirst({
      where: {
        id: userWithoutPass.id,
      },
    })

    if (!user) {
      const handle_err: error_object = handle_error_http_response(
        new Error('User not found'),
        '0005',
      )
      throw new custom_error(
        handle_err.error_message,
        handle_err.error_message_detail,
        handle_err.error_code,
        handle_err.status,
      )
    }

    const passwordMatches = await bcrypt.compare(
      body.oldPassword,
      user.password!,
    )

    if (passwordMatches) {
      const hashedPassword = await bcrypt.hash(body.newPassword, 10)
      const updatedUser = await prisma.userTest.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
        },
      })
      return updatedUser
    } else {
      const handle_err: error_object = handle_error_http_response(
        new Error('User not found'),
        '0005',
      )
      throw new custom_error(
        handle_err.error_message,
        handle_err.error_message_detail,
        handle_err.error_code,
        handle_err.status,
      )
    }
  } catch (error) {
    const handle_err: error_object = handle_error_http_response(
      error,
      '0005',
    )
    throw new custom_error(
      handle_err.error_message,
      handle_err.error_message_detail,
      handle_err.error_code,
      handle_err.status,
    )
  }
}
