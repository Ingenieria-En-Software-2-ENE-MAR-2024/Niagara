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
  
  export const getPatients = async () => {
    try {
      const allPatients = await prisma.userTest.findMany({
       select: {
        id: true,
        name: true,
        ci: true,
        email: true

       },
        where: {
            role: "patient"
        }
      })

      return allPatients
    } catch (error) {
      throw error
    }
  }
  
  export const patientService = {
    getPatients,
  }
  