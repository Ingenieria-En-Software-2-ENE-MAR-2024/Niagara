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


export const historyTemplateService = {
    create_history_template,
  }
  