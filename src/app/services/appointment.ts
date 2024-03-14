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
import { BorderAll } from '@mui/icons-material'



const create_appointment = async (body: Tappointment_create_body) => {
  try {
    // Buscamos que el paciente exista y el doctor existan

        const foundPatient = await prisma.patient.findFirst({
            where: {
              user:{
                id: body.patient_id
              }
            },
        })

        if (!foundPatient) {
            throw new Error('Patient does not exists')
        }

        const foundMedic = await prisma.medic.findFirst({
          where: {
            user:{
              id: body.medic_id
            }
          },
      })


        if (!foundMedic) {
            throw new Error('Medic does not exists')
        }

        const start_date = formatDateToDb(body.start_date)

        const end_date = formatDateToDb(body.end_date);

        if (start_date >= end_date) {
          throw new Error('The start date must be less than the end date.');
        }
        
       
        const existingAppointment = await prisma.appointment.findFirst({
          where: {
            medic_id: body.medic_id,
            start_date,
            end_date,
          },
        });
        
        if (existingAppointment) {
          throw new Error('There is already an appointment with the same dates for this medic');
        }

        const newAppointmentData = {
            start_date,
            end_date,
            medic_id: body.medic_id,
            patient_id: body.patient_id,
            description : body.description,
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
          id: new_appointment.id // Reemplaza appointmentId con el ID del appointment específico que deseas consultar
        },
        include: {
          patient: {
            include:{
              user: true
            }
          } ,
          medic:{
            include:{
              user: true
            }
          }
        }
      });
    
  
      const appointmentFormarted = {
          id: new_appointment.id,
          start_date:  formatDateToFront(new_appointment.start_date),
          end_date: formatDateToFront(new_appointment.end_date),
          id_medic: new_appointment.medic_id,
          id_patient: new_appointment.patient_id,
          patient_name : appointmentWithRelatedData?.patient.user.name,
          medic_name : appointmentWithRelatedData?.medic.user.name,
          description: appointmentWithRelatedData?.description,
          speciality: appointmentWithRelatedData?.medic.speciality
      }
  
    
  
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
            user:{
              id
            }
          },
      })

        if (!foundMedic) {
            throw new Error('Medic does not exists')
        }
        let FoundAppointment;
        if (date != null) {
            const dateFormatted = formatDateToDb(date)

            FoundAppointment = await prisma.appointment.findMany({
                where:{
                  AND:[
                    { medic_id: foundMedic.medic_id },
                    {start_date: dateFormatted }
                  ]
                },
                include:{
                  patient: {
                    include:{
                      user: true
                    }
                  } ,
                  medic:{
                    include:{
                      user: true
                    }
                  }
                }
            });

        } else {
            FoundAppointment = await prisma.appointment.findMany({where:{medic_id:foundMedic.medic_id},
                include:{
                  patient: {
                    include:{
                      user: true
                    }
                  } ,
                  medic:{
                    include:{
                      user: true
                    }
                  }
                }});

        }

        if (FoundAppointment.length > 0) {
            let formattedAppointments: any = [];

            FoundAppointment.forEach(appointment=>{
                let appointmentFormarted = {
                  id: appointment.id,
                  start_date: formatDateToFront(appointment.start_date),
                  end_date: formatDateToFront(appointment.end_date),
                  id_medic: appointment.medic_id,
                  id_patient: appointment.patient_id,
                  name_patient : appointment?.patient.user.name,
                  name_medic : appointment?.medic.user.name,
                  speciality : appointment?.medic.speciality,
                  description: appointment.description
              }
              formattedAppointments.push(appointmentFormarted);
              
        
        
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
        const foundPatient = await prisma.patient.findFirst({
          where: {
            user:{
              id
            }
          },
      })


        if (!foundPatient) {
            throw new Error('Patient does not exists')
        }
        let FoundAppointment;
        if (date != null) {
            const dateFormatted = formatDateToDb(date)

            FoundAppointment = await prisma.appointment.findMany({where:{AND:[
                { patient_id: id },
                { start_date: dateFormatted }
              ]},
              
              include:{
                patient: {
                  include:{
                    user: true
                  }
                } ,
                medic:{
                  include:{
                    user: true
                  }
                }
              }});

        } else {
            FoundAppointment = await prisma.appointment.findMany({where:{patient_id:id},
                include:{
                  patient: {
                    include:{
                      user: true
                    }
                  } ,
                  medic:{
                    include:{
                      user: true
                    }
                  }
                }});

        }

        if (FoundAppointment.length > 0) {
            let formattedAppointments: any = [];

            FoundAppointment.forEach(appointment=>{
                let appointmentFormarted = {
                  id: appointment.id,
                  start_date: formatDateToFront(appointment.start_date),
                  end_date: formatDateToFront(appointment.end_date),
                  id_medic: appointment.medic_id,
                  id_patient: appointment.patient_id,
                  name_patient : appointment?.patient.user.name,
                  name_medic : appointment?.medic.user.name,
                  speciality : appointment?.medic.speciality,
                  description: appointment.description
              }
              formattedAppointments.push(appointmentFormarted);
              
        
        
              });
              return formattedAppointments;
        } else {
            return FoundAppointment
        }

    } catch (error) {
        throw error
    }
}



const updateAppointment = async (
  body: Tappointment_update_body,
  appointmentId: number,
) => {
    try {
        let start_date
        let end_date

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
        const foundPatient = await prisma.patient.findFirst({
          where: {
            user:{
              id: body.patient_id
            }
          },
      })

        if (!foundPatient) {
            throw new Error('Patient does not exists')
        }

        const foundMedic = await prisma.medic.findFirst({
          where: {
            user:{
              id:body.medic_id
            }
          },
      })

        if (!foundMedic) {
            throw new Error('Medic does not exists')
        }

        // Necesitamos parsear la fecha
        if (body.start_date) {
            start_date = formatDateToDb(body.start_date)
            const dateVerified = verifyDate(start_date)
        }


        if (body.end_date) {
            end_date = formatDateToDb(body.end_date)
            const dateVerified = verifyDate(end_date)
        }

        

        const newAppointmentData = {
            start_date: body.start_date ? start_date : foundAppointment.start_date,
            end_date: body.end_date ? end_date : foundAppointment.end_date,
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

        const appointmentWithRelatedData = await prisma.appointment.findUnique({
          where: {
              id: appointmentId,
          },
          include:{
            patient: {
              include:{
                user: true
              }
            } ,
            medic:{
              include:{
                user: true
              }
            }
          }
          
      });

      if (!appointmentWithRelatedData) {
        throw new Error('Error reading apointment after updating')
    }

        const appointmentFormarted = {
            id: appointmentWithRelatedData.id,
            start_date: formatDateToFront(appointmentWithRelatedData.start_date),
            end_date: formatDateToFront(appointmentWithRelatedData.end_date),
            medic_id: appointmentWithRelatedData.medic_id,
            patient_id:appointmentWithRelatedData.patient_id, 
            name_patient : appointmentWithRelatedData?.patient.user.name,
            name_medic : appointmentWithRelatedData?.medic.user.name,
            speciality : appointmentWithRelatedData?.medic.speciality,
            description: appointmentWithRelatedData.description
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
      throw new Error('Error deleting appointment')
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
