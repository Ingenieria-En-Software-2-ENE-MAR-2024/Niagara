import { z } from 'zod'
import { EdLevel } from '@prisma/client'

const profile_update_object_body = z.object({
  vision:         z.string().optional(),
  skills:         z.string().array().optional(),
  ed_lvl:         z.nativeEnum(EdLevel).optional(),
  prof_formation: z.string().array().optional(),
  events:         z.string().array().optional(),
  presentations:  z.string().array().optional(),
  publications:   z.string().array().optional(),
  grants:         z.string().array().optional(),
})

export const validator_profile_create_update = (body: unknown) => {
  const its_valid = profile_update_object_body.parse(body)
  return its_valid
}