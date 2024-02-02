import { NextRequest, NextResponse } from 'next/server'
// import {z} from "zod"
import prisma from '../../../../prisma/prisma'

export async function GET(request: NextRequest) {
  const response = {
    loading: false,
    error: null,
    data: {
      id: 'unique_form_identifier',
      title: 'titulo del formulario s',
      questions: [
        {
          id: 'q1',
          type: 'single-choice',
          label: 'Pregunta de Selección Simple',
          options: ['Opción 1', 'Opción 2', 'Opción 3'],
        },
        {
          id: 'q2',
          type: 'multiple-choice',
          label: 'Pregunta de Selección Múltiple',
          options: ['Opción A', 'Opción B', 'Opción C'],
        },
        {
          id: 'q3',
          type: 'file-upload',
          label: 'Carga de Archivos',
        },
        {
          id: 'q4',
          type: 'short-text',
          label: 'Área de Texto Corto',
        },
        {
          id: 'q5',
          type: 'long-text',
          label: 'Área de Texto Largo',
        },
      ],
    },
  }
  return NextResponse.json(response)
}
