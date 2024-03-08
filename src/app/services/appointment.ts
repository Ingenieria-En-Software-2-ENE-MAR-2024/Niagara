import prisma from '../../../prisma/prisma'
import {
  add_property,
  formatDateToDb,
  formatDateToFront,
  verifyDate,
} from '../utils/utils'
import { add_object_to_array } from '../utils/utils'
import * as bcrypt from 'bcryptjs'
import {
  custom_error,
  handle_error_http_response,
} from '../utils/error_handler'
import { error_object } from '../interfaces/error'
import { verifyJwt } from '@/helpers/jwt'
import { Tappointment_create_body, Tappointment_update_body } from '../validators/appointment'
import { BorderAll } from '@mui/icons-material'

const create_appointment = async (body: Tappointment_create_body) => {
  try {
    // Buscamos que el paciente exista y el doctor existan
    const foundPatient = await prisma.userTest.findFirst({
      where: {
        id: body.id_patient,
        role: 'Patient',
      },
    })

    if (!foundPatient) {
      throw new Error('Patient does not exists')
    }

    const foundMedic = await prisma.medic.findFirst({
      where: {
        id: body.id_medic,
      },
    })

    if (!foundMedic) {
      throw new Error('Medic does not exists')
    }

    // Necesitamos parsear la fecha

    const start_date = formatDateToDb(body.start_date)

    const end_date = formatDateToDb(body.end_date)

    const newAppointmentData = {
      start_hour: body.start_hour,
      end_hour: body.end_hour,
      start_date,
      end_date,
      id_medic: body.id_medic,
      id_patient: body.id_patient,
      description: body.description,
    }

    // Creamos la cita
    const new_appointment = await prisma.appointment.create({
      data: newAppointmentData,
    })

    if (!new_appointment) {
      throw new Error('Error creating appointment')
    }

    const appointmentWithRelatedData = await prisma.appointment.findUnique({
      where: {
        id: new_appointment.id, // Reemplaza appointmentId con el ID del appointment específico que deseas consultar
      },
      include: {
        user: true,
        medic: true,
      },
    })

    const appointmentFormarted = {
      id: new_appointment.id,
      start_hour: new_appointment.start_hour,
      end_hour: new_appointment.end_hour,
      start_date: formatDateToFront(new_appointment.start_date),
      end_date: formatDateToFront(new_appointment.end_date),
      id_medic: new_appointment.id_medic,
      id_patient: new_appointment.id_patient,
      patient_name: appointmentWithRelatedData?.user.name,
      description: appointmentWithRelatedData?.description,
      speciality: appointmentWithRelatedData?.medic.speciality,
    }

    return appointmentFormarted
  } catch (error) {
    throw error
  }
}

const read_medic_appointment = async (id: number, date?: string) => {
  try {
    // Buscamos que medico exista y el doctor existan

    const foundMedic = await prisma.medic.findFirst({
      where: {
        userId: id,
      },
    })

    if (!foundMedic) {
      throw new Error('Medic does not exists')
    }
    let FoundAppointment
    if (date != null) {
      const dateFormatted = formatDateToDb(date)

      FoundAppointment = await prisma.appointment.findMany({
        where: {
          AND: [{ id_medic: foundMedic.id }, { start_date: dateFormatted }],
        },
        include: {
          user: true,
          medic: true,
        },
      })
    } else {
      FoundAppointment = await prisma.appointment.findMany({
        where: { id_medic: foundMedic.id },
        include: {
          user: true,
          medic: true,
        },
      })
    }

    if (FoundAppointment.length > 0) {
      let formattedAppointments: any = []

      FoundAppointment.forEach((appointment) => {
        let appointmentFormarted = {
          id: appointment.id,
          start_hour: appointment.start_hour,
          end_hour: appointment.end_hour,
          start_date: formatDateToFront(appointment.start_date),
          end_date: formatDateToFront(appointment.end_date),
          id_medic: appointment.id_medic,
          id_patient: appointment.id_patient,
          name_patient: appointment?.user.name,
          speciality: appointment?.medic.speciality,
          description: appointment.description,
        }
        formattedAppointments.push(appointmentFormarted)
      })
      return formattedAppointments
    } else {
      return FoundAppointment
    }
  } catch (error) {
    throw error
  }
}

const read_patient_appointment = async (id: number, date?: string) => {
  try {
    // Buscamos que el paciente exista y el doctor existan

    const foundPatient = await prisma.userTest.findFirst({
      where: {
        id,
      },
    })

    console.log(foundPatient)

    if (!foundPatient || foundPatient.role != 'Patient') {
      throw new Error('Patient does not exists')
    }
    let FoundAppointment
    if (date != null) {
      const dateFormatted = formatDateToDb(date)

      FoundAppointment = await prisma.appointment.findMany({
        where: { AND: [{ id_patient: id }, { start_date: dateFormatted }] },

        include: {
          user: true,
          medic: true,
        },
      })
    } else {
      FoundAppointment = await prisma.appointment.findMany({
        where: { id_patient: id },
        include: {
          user: true,
          medic: true,
        },
      })
    }

    if (FoundAppointment.length > 0) {
      let formattedAppointments: any = []

      FoundAppointment.forEach((appointment) => {
        let appointmentFormarted = {
          id: appointment.id,
          start_hour: appointment.start_hour,
          end_hour: appointment.end_hour,
          start_date: formatDateToFront(appointment.start_date),
          end_date: formatDateToFront(appointment.end_date),
          id_medic: appointment.id_medic,
          id_patient: appointment.id_patient,
          name_patient: appointment?.user.name,
          speciality: appointment?.medic.speciality,
          description: appointment.description,
        }
        formattedAppointments.push(appointmentFormarted)
      })
      return formattedAppointments
    } else {
      return FoundAppointment
    }
  } catch (error) {
    throw error
  }
}

//   export const read_user = async (id: number) => {
//     try {
//       const read_user = await prisma.userTest.findFirst({
//         where: {
//           id: id,
//         },
//       })

const updateAppointment = async (
  body: Tappointment_update_body,
  appointmentId: number,
) => {
  try {
    let date
    // Buscamos que la cita exista
    const foundAppointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
      },
    })

    if (!foundAppointment) {
      throw new Error('Appointment does not exists')
    }

    // Buscamos que el paciente exista y el doctor existan
    const foundPatient = await prisma.userTest.findFirst({
      where: {
        id: body.id_patient,
        role: 'Patient',
      },
    })

    if (!foundPatient) {
      throw new Error('Patient does not exists')
    }

    const foundMedic = await prisma.medic.findFirst({
      where: {
        id: body.id_medic,
      },
    })

    if (!foundMedic) {
      throw new Error('Medic does not exists')
    }

    // Necesitamos parsear la fecha

    if (body.date) {
      date = formatDateToDb(body.date)
      const dateVerified = verifyDate(date)
    }

    const newAppointmentData = {
      hour: body.hour ? body.hour : foundAppointment.start_hour,
      date: date ? date : foundAppointment.start_date,
      id_medic: body.id_medic ? body.id_medic : foundAppointment.id_medic,
      id_patient: body.id_patient
        ? body.id_patient
        : foundAppointment.id_patient,
    }

    // Creamos la cita
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: newAppointmentData,
    })

    if (!updatedAppointment) {
      throw new Error('Error creating appointment')
    }

    const appointmentFormarted = {
      id: updatedAppointment.id,
      hour: updatedAppointment.start_hour,
      date: formatDateToFront(updatedAppointment.start_date),
      id_medic: updatedAppointment.id_medic,
      id_patient: updatedAppointment.id_patient,
    }

    return appointmentFormarted
  } catch (error) {
    throw error
  }
}

const deleteAppointment = async (appointmentId: number) => {
  try {
    // Buscamos que la cita exista
    const foundAppointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
      },
    })

    if (!foundAppointment) {
      throw new Error('Appointment does not exists')
    }

    // Creamos la cita
    const deletedAppointment = await prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    })

    if (!deletedAppointment) {
      throw new Error('Error creating appointment')
    }

    return deletedAppointment
  } catch (error) {
    throw error
  }
}

export const appointmentService = {
  create_appointment,
  updateAppointment,
  deleteAppointment,
  read_medic_appointment,
  read_patient_appointment,
}
