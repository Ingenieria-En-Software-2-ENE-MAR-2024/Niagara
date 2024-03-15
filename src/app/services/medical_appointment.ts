import { JsonObject } from '@prisma/client/runtime/library'
import prisma from '../../../prisma/prisma'
import { add_property } from '../utils/utils'
import { add_object_to_array } from '../utils/utils'



export const create_medical_appointment = async (data:JsonObject) => {
    try {
    
  
      return data
    } catch (error) {
      throw error
    }
  }
  


  export const list_medical_appointments = async (
    search_fields?: string[],
    search_texts?: string[],
  ) => {
    try {
      let where_clause = {}
      let medical_appointments
      if (search_fields != null && search_texts != null) {
        if (search_fields.length > 1) {
          let object_where: any[] = []
          for (let i = 0; i < search_fields.length; i++) {
            object_where = add_object_to_array(
              object_where,
              search_fields[i],
              search_texts[i],
            )
          }
          medical_appointments = await prisma.userTest.findMany({
            where: { AND: object_where },
          })
        } else {
          add_property(where_clause, search_fields[0], search_texts[0])
          medical_appointments = await prisma.userTest.findMany({
            where: where_clause,
          })
        }
  
        return medical_appointments
      } else {
        const medical_appointments = [{"id":1,"date":"2024-03-01","user_id":2,"doctr_id":3,"description":"description 1"},{"id":2,"date":"2024-03-02","user_id":2,"doctor_id":5,"description":"description 2"}]
  
        return medical_appointments
      }
    } catch (error) {
      throw error
    }
  }


  export const read_medical_appointment = async (id: number) => {
    try {
     // const read_user = await prisma.userTest.findFirst({
      //  where: {
      //    id: id,
    //    },
   //   })
      const medical_appointment= {"id":id,"date":"2024-03-01","user_id":2,"doctor_id":3,"description":"description "+`${id}`}
      if (!medical_appointment) {
        throw new Error('Medical appointment does not exists')
      }
  
      return medical_appointment
    } catch (error) {
      throw error
    }
  }


  export const delete_my_medical_appointment = async (id: number) => {
    try {
     //// const delete_medical_appointment = await prisma.userTest.delete({
   //     where: {
      //    id: id,
     //   },
   //   })
          const delete_medical_appointment = {"id":id,"date":"2024-03-01","user_id":2,"doctor_id":3,"description":"description "+`${id}`}
      if (!delete_medical_appointment) {
        throw new Error('Medical appointment does not exists')
      }
  
      return delete_medical_appointment
    } catch (error) {
      throw error
    }
  }


  export const update_my_medical_appointment = async (id: number) => {
    try {
    /*  const read_user = await prisma.userTest.findFirst({
        where: {
          id: id,
        },
      })*/

      const medical_appointment = {"id":id,"date":"2024-03-01","user_id":2,"doctor_id":3};
  
      if (!medical_appointment) {
        throw new Error('Medical appoinment does not exists')
      }
  
      const update_medical_appointment ={"id":id,"date":"2024-03-01","user_id":2,"doctr_id":3,"description":"description "+`${id}`};  /*await prisma.userTest.update({
        where: {
          id: id,
        },
        data: {
          name: body.name,
          role: body.role,
        },
      })*/
  
      return update_medical_appointment
    } catch (error) {
      throw error
    }
  }
  