import prisma from '../../prisma/prisma'

export const obtainFormById = async (id?: number) => {
  try {
    const response = await prisma.forms.findFirstOrThrow()
    return response
  } catch (error) {
    return null
  }
}

export const submitForm = async (id_form: number, answers: Array<any>) => {
  try {
    const insertAnswer = await prisma.answers.create({
      data: {
        id_form,
        questions: answers,
      },
    })
    return insertAnswer
  } catch (error) {
    return null
  }
}
