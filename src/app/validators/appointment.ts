import { z } from 'zod'

const appointment_create_object_body = z.object({
  start_hour: z.string(),
  end_hour: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  id_medic: z.number(),
  id_patient: z.number(),
  description: z.string()
})

export type Tappointment_create_body = z.infer<typeof appointment_create_object_body>

export const validator_appointment_create = (body: Tappointment_create_body) => {
  const its_valdiate = appointment_create_object_body.parse(body)
  return its_valdiate
}

