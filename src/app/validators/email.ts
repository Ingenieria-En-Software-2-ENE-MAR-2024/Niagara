import { z } from 'zod'

const email_credentials = z.object({
  name: z.string(),
  address: z.string(),
  password: z.string(),
})

const email_data_message = z.object({
  to: z.union([z.string(), z.array(z.string())]),
  subject: z.string(),
  text: z.string(),
})

const email_body = z.object({
  credentials: email_credentials,
  data: email_data_message,
})

export const validator_email_body = (body: unknown) => {
  try {
    const its_valdiate = email_body.parse(body)
    return its_valdiate
  } catch (error) {
    throw error
  }
}
