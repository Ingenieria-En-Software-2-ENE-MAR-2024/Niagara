import { z } from 'zod'

const appointment_create_object_body = z.object({
  hour: z.string(),
  date: z.string(),
  id_medic: z.number(),
  id_patient: z.number(),
})

export type Tappointment_create_body = z.infer<
  typeof appointment_create_object_body
>

export const validator_appointment_create = (
  body: Tappointment_create_body,
) => {
  const its_valdiate = appointment_create_object_body.parse(body)
  return its_valdiate
}

const appointment_update_object_body = z.object({
  hour: z.string().optional(),
  date: z.string().optional(),
  id_medic: z.number().optional(),
  id_patient: z.number().optional(),
})

export type Tappointment_update_body = z.infer<
  typeof appointment_update_object_body
>

export const validator_appointment_update = (
  body: Tappointment_update_body,
) => {
  const its_valdiate = appointment_update_object_body.parse(body)
  return its_valdiate
}
