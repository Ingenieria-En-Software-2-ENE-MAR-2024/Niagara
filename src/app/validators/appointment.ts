import { z } from 'zod'

const appointment_create_object_body = z.object({
  start_date: z.string(),
  end_date: z.string(),
  medic_id: z.number(),
  patient_id: z.number(),
  description: z.string()
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
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  medic_id: z.number().optional(),
  patient_id: z.number().optional(),
  description: z.string().optional()
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
