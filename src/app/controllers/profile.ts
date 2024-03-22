import { NextRequest } from 'next/server'

import { validator_profile_create_update } from '@/app/validators/profile'
import { obtain_profile, edit_user_profile } from '@/app/services/profile'


export const get_profile = async (
  req: NextRequest,
  { params }: { params: { id: string} }) => {
  try {
    const user_id = parseInt(params.id)
    const profile = await obtain_profile(user_id)
    return profile
  } catch (error) {
      throw error
  }
}


export const put_profile = async (
  req: NextRequest,
  { params }: { params: { id: string} }) => {
  try {
    const body = await req.json()
    const data = {user_id: parseInt(params.id), ...validator_profile_create_update(body)}
    const profile = await edit_user_profile(data)
    return profile
  } catch (error) {
      throw error
  }
}