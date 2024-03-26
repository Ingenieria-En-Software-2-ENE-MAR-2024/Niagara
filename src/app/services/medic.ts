
import prisma from '../../../prisma/prisma'
import { getAllMedicReturnBody, TGetAllMedicReturnBody } from '../validators/medic';


export const getMedic = async (id: number) => {
  try {
    const medicFound = await prisma.medic.findFirst({
      where: {
        medic_id: id,
      },
    })

    if (!medicFound) {
      throw new Error('User does not exists')
    }

    return medicFound
  } catch (error) {
    throw error
  }
}

export const getMedics = async () => {
  try {
    const allMedics = await prisma.medic.findMany({
      include: {
        user: true,
      }
    })

   const responseMedicsArray:TGetAllMedicReturnBody[] = []

   allMedics.map((medic) => {
      const obj:TGetAllMedicReturnBody = {
        medic_id: medic.medic_id,
        name: medic.user.name,
        email: medic.user.email,
        speciality: medic.speciality,
        ci: medic.user.ci,
      }

      responseMedicsArray.push(obj)
   })

    return responseMedicsArray
  } catch (error) {
    throw error
  }
}

export const medicService = {
  getMedic,
  getMedics,
}
