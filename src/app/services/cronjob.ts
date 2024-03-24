import { email_credentials, email_data_message } from '@/app/interfaces/email'
import cron from 'node-cron'
import { send_email } from './email'
import prisma from '../../../prisma/prisma'

const { EMAIL_ADDRESS, EMAIL_NAME, EMAIL_PASSWORD } = process.env

const checkPasswordsExpiry = async () => {
  try {
    const currentDate = new Date()
    const expirationDate = new Date(currentDate)
    expirationDate.setDate(currentDate.getDate() + 7)

    const expiratedPassword = await prisma.passwordExpiration.findMany({
      where: {
        expirationDate: {
          lte: expirationDate,
        },
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    })
    for (const {
      user: { name, email },
    } of expiratedPassword) {
      await send_email(
        {
          address: EMAIL_ADDRESS || '',
          name: EMAIL_NAME || '',
          password: EMAIL_PASSWORD || '',
        },
        {
          to: email,
          subject: 'Tu contraseña está a punto de expirar',
          text: `<html>
          <body>
            <p>Estimado/a ${name},</p>
            <p>Su contraseña está a punto de expirar. Para mantener la seguridad de su cuenta, le recomendamos que cambie su contraseña lo antes posible.</p>
            <p>Por favor, siga estos pasos para cambiar su contraseña:</p>
            <ol>
              <li>Inicie sesión en su cuenta.</li>
              <li>Vaya a la configuración de su perfil.</li>
              <li>Encuentre la opción para cambiar su contraseña.</li>
              <li>Cree una nueva contraseña segura y única.</li>
              <li>Guarde los cambios.</li>
            </ol>
            <p>Gracias por su atención y por mantener su cuenta segura.</p>
          </body>
        </html>
        `,
        },
      )

    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const execute_cronjob = async () => {
  cron.schedule('0 0 * * *', async () => {
    console.log("Ejecutando cron job")
    await checkPasswordsExpiry()
    console.log("Termino cron job")
    
  })
}
