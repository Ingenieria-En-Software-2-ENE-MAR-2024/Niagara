import { Thistory_template_create_body } from "../validators/questionary"
import prisma from '../../../prisma/prisma'

const create_history_template = async (admin_id:number,body: Thistory_template_create_body) => {
    try {
        console.log(admin_id)
        const found_admin = await await prisma.admin.findFirst({
            where: {
              user:{
                id: admin_id
              }
            },
        });



        if (!found_admin) {
            throw new Error('Admin does not exists')
        }

        const newHistoryTempalteData = {
            admin_id,
            questionsType:body.QuestionType
        }

       
      

        const new_history_template = await prisma.questionary.create({
            data:  newHistoryTempalteData,
          })

          if (!new_history_template) {
            throw new Error('Error creating history template')
          }

          return new_history_template;
      } catch (error) {
          throw error
      }
  
  }


  const obtain_all_history_template = async () => {
    try {
      // const found_admin = await prisma.admin.findFirst()
  
      // if (!found_admin) {
      //   throw new Error('Admin does not exists')
      // }
  
      // const all_history_template = await prisma.questionary.findMany()
  
      // if (!all_history_template) {
      //   throw new Error('Error getting history template')
      // }
  
      const all_history_template = {
        id: 12,
        admin_id: 2,
        questionsType: [
          {
            "type": "TEXT",
            "question": "Cual es tu nombre",
             "section":["Datos personales"]
           },
          {
           "type": "SIMPLE_SELECT",
            "question": "Cual es su genero",
           "options": ["Masculino","Femenino"],
           "section":["Datos personales"]
          },
        {
           "type": "MULTIPLE_SELECT",
           "question": "Cuantas enfermedades tiene",
           "options": ["Opcion1","Opcion2","Opcion3"],
           "section":["Datos personales","Paciente"]
          },
        {
           "type": "DATE",
           "question": "Fecha de nacimiento",
           "section":["Datos personales","Paciente"]
          },
          {
           "type": "NUMBER",
           "question": "Cual es tu edad",
            "section":["Datos personales"]
          }
        ],
        createdAt: '2024-04-03T17:53:00.417Z',
        updatedAt: '2024-04-03T17:53:00.417Z',
      }
      return all_history_template
    } catch (error) {
      throw error
    }
  }
  
  
  export const historyTemplateService = {
    create_history_template,
    obtain_all_history_template,
  }