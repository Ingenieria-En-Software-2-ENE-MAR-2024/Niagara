import prisma from '@/../prisma/prisma'
import { EdLevel } from '@prisma/client'

import { edit_profile } from '@/app/interfaces/profile'
import { custom_error } from '../utils/error_handler'


export const obtain_profile = async (user_id: number) => {
  try {
    const user_profile = await prisma.profile.findFirst({
      where: {
        user_id: user_id,
      }
    })

    if (!user_profile)
      throw new custom_error(
        'User profile not found. User might not exist',
        'User profile not found. User might not exist',
        '404',
        404
      )

    return user_profile
  } catch (err) {
      throw err
  }
}

export const create_empty_profile = async (user_id: number) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        user_id: user_id,
      }
    })

    if (profile)
      throw Error('User already has a profile.')

    const user_profile = await prisma.profile.create({
      data: {
        user_id: user_id,
        vision: "",
        skills: [],
        ed_lvl: EdLevel.NONE,
        prof_formation: [],
        events: [],
        presentations: [],
        publications: [],
        grants: []
      }
    })

    return user_profile
  } catch (err) {
      throw err
  }
}


export const edit_user_profile = async (body: edit_profile) => {
  try {
    await obtain_profile(body.user_id)
    await prisma.profile.update({
      where: {
        user_id: body.user_id
      },
      data: body,
    })
  } catch (error) {
      throw error
  }
}