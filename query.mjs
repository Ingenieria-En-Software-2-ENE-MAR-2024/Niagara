import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const main = async () => {
  await create_users()
  await create_appointment()
}

const create_users = async () => {
  const users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      ci: '12345678',
      password: '12345678',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Medic User',
      email: 'medic@example.com',
      ci: '87654321',
      password: '12345678',
      role: 'medic',
      speciality: 'Cardiology',
    },
    {
      id: 3,
      name: 'Patient User',
      email: 'patient@example.com',
      ci: '13579246',
      password: '12345678',
      role: 'patient',
    },
  ]
  for (const user of users) {
    await create_user(user)
  }
}

const create_user = async (body) => {
  try {
    const new_user = await prisma.userTest.create({
      data: {
        id: body.id,
        name: body.name,
        email: body.email ?? '',
        ci: body.ci,
        password: await bcrypt.hash(body.password, 10),
        role: body.role,
      },
    })

    if (body.role?.toLowerCase() === 'medic' && body.speciality !== undefined) {
      await prisma.medic.create({
        data: {
          medic_id: new_user.id,
          speciality: body.speciality,
        },
      })
    }

    if (body.role?.toLowerCase() === 'patient') {
      await prisma.patient.create({
        data: {
          patient_id: new_user.id,
        },
      })
    }
    console.log('Creado con exito usuario: ', body.name)
  } catch (error) {
    console.log('Ocurrio un error creando usuarios...')
  }
}

const create_appointment = async () => {
  try {
    const body = {
      medic_id: 2, // ID del médico en el arreglo de users
      patient_id: 3, // ID del paciente en el arreglo de users
      start_date: '2024-03-19T10:00:00', // Fecha de inicio de la cita
      end_date: '2024-03-19T11:00:00', // Fecha de finalización de la cita
      description: 'Consulta de rutina', // Descripción de la cita
    }

    const start_date = formatDateToDb(body.start_date)
    const end_date = formatDateToDb(body.end_date)

    const newAppointmentData = {
      start_date,
      end_date,
      medic_id: body.medic_id,
      patient_id: body.patient_id,
      description: body.description,
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        medic_id: body.medic_id,
        start_date,
        end_date,
      },
    })

    if (existingAppointment) {
      throw new Error()
    }

    await prisma.appointment.create({
      data: newAppointmentData,
    })

    console.log("Se creo con exito el appointment")
    
  } catch (error) {
    console.log(
      'Ocurrio un error creando un appointment. Verifica que no este creado el appointment',
    )
  }
}

const formatDateToDb = (date) => {
  const dateFormartedForDb = new Date(date)
  return dateFormartedForDb
}
main()
