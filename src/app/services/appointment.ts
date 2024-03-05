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
import {
    Tappointment_create_body,
    Tappointment_update_body,
} from '../validators/appointment'

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

        const date = formatDateToDb(body.date)
        const dateVerified = verifyDate(date)

        const newAppointmentData = {
            hour: body.hour,
            date,
            id_medic: body.id_medic,
            id_patient: body.id_patient,
        }

        // Creamos la cita
        const new_appointment = await prisma.appointment.create({
            data: newAppointmentData,
        })

        if (!new_appointment) {
            throw new Error('Error creating appointment')
        }

        const appointmentFormarted = {
            id: new_appointment.id,
            hour: new_appointment.hour,
            date: formatDateToFront(new_appointment.date),
            id_medic: new_appointment.id_medic,
            id_patient: new_appointment.id_patient,
        }

        console.log({ appointmentFormarted })

        return appointmentFormarted
    } catch (error) {
        throw error
    }
}


const read_medic_appointment = async (id: number, date?: string) => {
    try {
        // Buscamos que el paciente exista y el doctor existan

        const foundMedic = await prisma.medic.findFirst({
            where: {
                id
            },
        })

        if (!foundMedic) {
            throw new Error('Medic does not exists')
        }
        let FoundAppointment;
        if (date != null) {
            const dateFormatted = formatDateToDb(date)

            FoundAppointment = await prisma.appointment.findMany({
                where: {
                    AND: [
                        { id_medic: id },
                        { date: dateFormatted }
                    ]
                }
            });

        } else {
            FoundAppointment = await prisma.appointment.findMany({ where: { id_medic: id } });

        }

        if (FoundAppointment.length > 0) {
            let formattedAppointments: any = [];

            FoundAppointment.forEach(appointment => {
                let appointmentFormarted = {
                    id: appointment.id,
                    hour: appointment.hour,
                    date: formatDateToFront(appointment.date),
                    id_medic: appointment.id_medic,
                    id_patient: appointment.id_patient,
                }
                formattedAppointments.push(appointmentFormarted);
                console.log(appointment)


            });
            return formattedAppointments;
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
                id
            },
        })

        console.log(foundPatient)

        if (!foundPatient || foundPatient.role != 'Patient') {
            throw new Error('Patient does not exists')
        }
        let FoundAppointment;
        if (date != null) {
            const dateFormatted = formatDateToDb(date)

            FoundAppointment = await prisma.appointment.findMany({
                where: {
                    AND: [
                        { id_patient: id },
                        { date: dateFormatted }
                    ]
                }
            });

        } else {
            FoundAppointment = await prisma.appointment.findMany({ where: { id_patient: id } });

        }

        if (FoundAppointment.length > 0) {
            let formattedAppointments: any = [];

            FoundAppointment.forEach(appointment => {
                let appointmentFormarted = {
                    id: appointment.id,
                    hour: appointment.hour,
                    date: formatDateToFront(appointment.date),
                    id_medic: appointment.id_medic,
                    id_patient: appointment.id_patient,
                }
                formattedAppointments.push(appointmentFormarted);
                console.log(appointment)


            });
            return formattedAppointments;
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
            hour: body.hour ? body.hour : foundAppointment.hour,
            date: date ? date : foundAppointment.date,
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
            hour: updatedAppointment.hour,
            date: formatDateToFront(updatedAppointment.date),
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
    read_patient_appointment
}
