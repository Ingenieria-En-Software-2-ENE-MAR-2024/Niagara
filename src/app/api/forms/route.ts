import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '../../../../prisma/prisma'

// Schema Body
const QuestionType = z.enum([
  'single-choice',
  'multiple-choice',
  'file-upload',
  'short-text',
  'long-text',
])

const Question = z.object({
  type: QuestionType,
  label: z.string(),
  options: z.array(z.string()).optional(),
})

const Form = z.object({
  title: z.string(),
  questions: z.array(Question),
})

export async function GET(request: NextRequest) {
  try {
    const response = await prisma.forms.findFirstOrThrow()
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const jsonBody = await request.json()
    Form.parse(jsonBody)
    const { title, questions } = jsonBody
    const insertForm = await prisma.forms.create({
      data: {
        title,
        questions,
      },
    })

    return NextResponse.json(insertForm)
  } catch (error) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 404 })
  }
}
