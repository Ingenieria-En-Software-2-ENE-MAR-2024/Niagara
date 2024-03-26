import { z } from "zod";


export const getAllMedicReturnBody = z.object({
    medic_id: z.number(),
    name: z.string(),
    email: z.string(),
    speciality: z.string(),
    ci: z.string(),
  })

export type TGetAllMedicReturnBody = z.infer<typeof getAllMedicReturnBody>