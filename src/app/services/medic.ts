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

export const getMedic = async (id: number) => {
  try {
    const medicFound = await prisma.medic.findFirst({
      where: {
        medic_id: id,
      },
    })

    if (!medicFound) {
      throw new Error('User does not exists')
    }

    return medicFound
  } catch (error) {
    throw error
  }
}

export const getMedics = async () => {
  try {
    const allMedics = await prisma.medic.findMany()

    return allMedics
  } catch (error) {
    throw error
  }
}

export const medicService = {
  getMedic,
  getMedics,
}
