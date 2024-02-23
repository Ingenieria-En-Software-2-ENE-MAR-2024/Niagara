import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { formsServices } from '@/services'

// Schema Body
const QuestionType = z.enum([
  'single-choice',
  'multiple-choice',
  'file-upload',
  'short-text',
  'long-text',
])

const Answer = z.object({
  type: QuestionType,
  label: z.string(),
  answer: z.string().optional(),
  options: z.array(z.string()).optional(),
})

const SubmitForm = z.object({
  id_form: z.number(),
  answers: z.array(Answer),
})

export async function POST(request: NextRequest) {
  try {
    const jsonBody = await request.json()
    SubmitForm.parse(jsonBody)
    const { id_form, answers } = jsonBody
    const insertAnswer = await formsServices.submitForm(id_form, answers)
    return NextResponse.json(insertAnswer)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Bad Request' }, { status: 404 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const response = await formsServices.obtainFormById()
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    )
  }
}
