import prisma from '../../../prisma/prisma'
import { add_property, formatDateToDb, formatDateToFront } from '../utils/utils'
import { add_object_to_array } from '../utils/utils'
import * as bcrypt from 'bcryptjs'
import {
  custom_error,
  handle_error_http_response,
} from '../utils/error_handler'
import { error_object } from '../interfaces/error'
import { verifyJwt } from '@/helpers/jwt'
import { Tappointment_create_body } from '../validators/appointment'
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
      end_hour : body.end_hour,
      start_date,
      end_date,
      id_medic: body.id_medic,
      id_patient: body.id_patient,
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
        user: true, 
        medic: true 
      }
    });
  

    const appointmentFormarted = {
        id: new_appointment.id,
        start_hour: new_appointment.start_hour,
        end_hour: new_appointment.end_hour,
        start_date:  formatDateToFront(new_appointment.start_date),
        end_date: formatDateToFront(new_appointment.end_date),
        id_medic: new_appointment.id_medic,
        id_patient: new_appointment.id_patient,
        patient_name : appointmentWithRelatedData?.user.name,
        description: appointmentWithRelatedData?.description,
        speciality: appointmentWithRelatedData?.medic.speciality
    }

  

    return appointmentFormarted
  } catch (error) {
    throw error
  }
}



const read_medic_appointment = async (id:number,date?:string) => {
  try {
    // Buscamos que medico exista y el doctor existan
    


    const foundMedic = await prisma.medic.findFirst({
      where: {
        userId:id
      },
    })

    if (!foundMedic) {
      throw new Error('Medic does not exists')
    }
    let FoundAppointment;
    if(date!=null){
      const dateFormatted = formatDateToDb(date)

       FoundAppointment = await prisma.appointment.findMany({
        where:{
          AND:[
            { id_medic: foundMedic.id },
            {start_date: dateFormatted }
          ]
        },
        include:{
          user: true,
          medic:true
        }
    });
  
    }else{
       FoundAppointment = await prisma.appointment.findMany({where:{id_medic:foundMedic.id},
        include:{
          user: true,
          medic:true
        }});

    }
   
    if(FoundAppointment.length>0){
      let formattedAppointments : any= [];

      FoundAppointment.forEach(appointment=>{
        let appointmentFormarted = {
          id: appointment.id,
          start_hour: appointment.start_hour,
          end_hour: appointment.end_hour,
          start_date: formatDateToFront(appointment.start_date),
          end_date: formatDateToFront(appointment.end_date),
          id_medic: appointment.id_medic,
          id_patient: appointment.id_patient,
          name_patient : appointment?.user.name,
          speciality : appointment?.medic.speciality,
          description: appointment.description
      }
      formattedAppointments.push(appointmentFormarted);
      


      });
      return formattedAppointments;
    }else{
      return FoundAppointment
    }

  } catch (error) {
    throw error
  }
}



const read_patient_appointment = async (id:number,date?:string) => {
  try {
    // Buscamos que el paciente exista y el doctor existan

    const foundPatient = await prisma.userTest.findFirst({
      where: {
        id
      },
    })

    console.log(foundPatient)

    if (!foundPatient || foundPatient.role!='Patient') {
      throw new Error('Patient does not exists')
    }
    let FoundAppointment;
    if(date!=null){
      const dateFormatted = formatDateToDb(date)

       FoundAppointment = await prisma.appointment.findMany({where:{AND:[
        { id_patient: id },
        { start_date: dateFormatted }
      ]},
      
      include:{
        user: true,
        medic:true
      }});
  
    }else{
       FoundAppointment = await prisma.appointment.findMany({where:{id_patient:id},
        include:{
          user: true,
          medic:true
        }});
    
    }
   
    if(FoundAppointment.length>0){
      let formattedAppointments : any= [];

      FoundAppointment.forEach(appointment=>{
        let appointmentFormarted = {
          id: appointment.id,
          start_hour: appointment.start_hour,
          end_hour: appointment.end_hour,
          start_date: formatDateToFront(appointment.start_date),
          end_date: formatDateToFront(appointment.end_date),
          id_medic: appointment.id_medic,
          id_patient: appointment.id_patient,
          name_patient : appointment?.user.name,
          speciality : appointment?.medic.speciality,
          description: appointment.description
      }
      formattedAppointments.push(appointmentFormarted);
      


      });
      return formattedAppointments;
    }else{
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

//       if (!read_user) {
//         throw new Error('User does not exists')
//       }

//       return read_user
//     } catch (error) {
//       throw error
//     }
//   }

//   export const list_users = async (
//     search_fields?: string[],
//     search_texts?: string[],
//   ) => {
//     try {
//       let where_clause = {}
//       let users
//       if (search_fields != null && search_texts != null) {
//         if (search_fields.length > 1) {
//           let object_where: any[] = []
//           for (let i = 0; i < search_fields.length; i++) {
//             object_where = add_object_to_array(
//               object_where,
//               search_fields[i],
//               search_texts[i],
//             )
//           }
//           users = await prisma.userTest.findMany({
//             where: { AND: object_where },
//           })
//         } else {
//           add_property(where_clause, search_fields[0], search_texts[0])
//           users = await prisma.userTest.findMany({
//             where: where_clause,
//           })
//         }

//         return users
//       } else {
//         const users = await prisma.userTest.findMany({})

//         return users
//       }
//     } catch (error) {
//       throw error
//     }
//   }

//   export const delete_my_user = async (id: number) => {
//     try {
//       const delete_user = await prisma.userTest.delete({
//         where: {
//           id: id,
//         },
//       })

//       if (!delete_user) {
//         throw new Error('User does not exists')
//       }

//       return delete_user
//     } catch (error) {
//       throw error
//     }
//   }

//   export const update_my_user = async (id: number, body: user_body_update) => {
//     try {
//       const read_user = await prisma.userTest.findFirst({
//         where: {
//           id: id,
//         },
//       })

//       if (!read_user) {
//         throw new Error('User does not exists')
//       }

//       const update_user = await prisma.userTest.update({
//         where: {
//           id: id,
//         },
//         data: {
//           name: body.name,
//           role: body.role,
//         },
//       })

//       return update_user
//     } catch (error) {
//       throw error
//     }
//   }

//   export const update_my_user_password = async (
//     body: user_body_update_password,
//     token: string,
//   ) => {
//     try {
//       const userWithoutPass = verifyJwt(token)

//       if (!userWithoutPass) {
//         const handle_err: error_object = handle_error_http_response(
//           new Error('Unauthorized'),
//           '0005',
//         )
//         throw new custom_error(
//           handle_err.error_message,
//           handle_err.error_message_detail,
//           handle_err.error_code,
//           handle_err.status,
//         )
//       }

//       const user = await prisma.userTest.findFirst({
//         where: {
//           id: userWithoutPass.id,
//         },
//       })

//       if (!user) {
//         const handle_err: error_object = handle_error_http_response(
//           new Error('User not found'),
//           '0005',
//         )
//         throw new custom_error(
//           handle_err.error_message,
//           handle_err.error_message_detail,
//           handle_err.error_code,
//           handle_err.status,
//         )
//       }

//       const passwordMatches = await bcrypt.compare(
//         body.oldPassword,
//         user.password!,
//       )

//       if (passwordMatches) {
//         const hashedPassword = await bcrypt.hash(body.newPassword, 10)
//         const updatedUser = await prisma.userTest.update({
//           where: { id: user.id },
//           data: {
//             password: hashedPassword,
//           },
//         })
//         return updatedUser
//       } else {
//         const handle_err: error_object = handle_error_http_response(
//           new Error('User not found'),
//           '0005',
//         )
//         throw new custom_error(
//           handle_err.error_message,
//           handle_err.error_message_detail,
//           handle_err.error_code,
//           handle_err.status,
//         )
//       }
//     } catch (error) {
//       const handle_err: error_object = handle_error_http_response(
//         error,
//         '0005',
//       )
//       throw new custom_error(
//         handle_err.error_message,
//         handle_err.error_message_detail,
//         handle_err.error_code,
//         handle_err.status,
//       )
//     }
//   }

export const appointmentService = {
  create_appointment,
  read_medic_appointment,
  read_patient_appointment
}
