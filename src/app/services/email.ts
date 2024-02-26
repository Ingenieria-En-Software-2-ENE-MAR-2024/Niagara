import { email_credentials, email_data_message } from '../interfaces/email'
import nodemailer from 'nodemailer'

export const send_email = async (
  credentials: email_credentials,
  { to, subject, text }: email_data_message,
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: credentials.address,
      pass: credentials.password,
    },
  } as nodemailer.TransportOptions);
    
  const data = {
    from: {
      name: credentials.name,
      address: credentials.address,
    },
    to,
    subject,
    text,
  }

  try {
    const info = await transporter.sendMail(data)
    return { status: 'The email was sent successfully', data }
  } catch (error) {
    throw error
  }
}
