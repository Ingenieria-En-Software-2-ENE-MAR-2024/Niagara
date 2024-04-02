import { Tmedic_history_create_body, validateQuestionnaire } from "../validators/questionary"
import prisma from '../../../prisma/prisma'

const create_medical_history = async (medic_id:number,body: Tmedic_history_create_body) => {
    try {
        
        const found_admin = await await prisma.medic.findFirst({
            where: {
              user:{
                id: medic_id
              }
            },
        });



        if (!found_admin) {
            throw new Error('medic does not exists')
        }

        const found_patient = await await prisma.patient.findFirst({
            where: {
              user:{
                id: body.patient_id
              }
            },
        });



        if (!found_patient) {
            throw new Error('patient does not exists')
        }


        const found_history_template : any= await prisma.questionary.findFirst({
            where: {
             id:body.questionary_id
            },
        });

        
        if (! found_history_template) {
            throw new Error('Medical History Template does not exists')
        }

        const is_validateQuestionnaire = validateQuestionnaire(found_history_template.questionsType,body.QuestionsAnwsers);

        const medicalHistoryData = {
            patient_id:body.patient_id,
            medic_id,
            questionary_id : body.questionary_id,
            questionsAnwsers: body.QuestionsAnwsers
        }
        const new_medical_history = await prisma.patientHistory.create({
            data: medicalHistoryData
        })
        
        if (!new_medical_history) {
            throw new Error('Error creating medical History')
        }

        const read_medicalHistory = await prisma.patientHistory.findUnique({
            where: {
                patient_id:new_medical_history.patient_id
            },
            include: {
                patient: {
                  include:{
                    user:{
                        select:{
                            name: true,
                            email: true,
                            ci: true,
                            password:false
                        }
                    }
                  }
                } ,
                medic:{
                  include:{
                    user: {
                        select:{
                            name: true,
                            email: true,
                            ci: true,
                            password:false
                        }
                    }
                  }
                },
                questionary:true
              }
        }) 
         
        
          return read_medicalHistory;
      } catch (error) {
          throw error
      }
  
  }


export const medicalHistoryTemplateService = {
    create_medical_history,
  }
  