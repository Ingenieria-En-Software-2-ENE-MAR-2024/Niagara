'use client'

import React from 'react'
import Menu from '@/components/Menu'

interface Question {
  question: string
  answer: string | number
}

interface HistoryProps {
  data: {
    patient_id: number
    questionary_id: number
    QuestionsAnwsers1: Question[]
    QuestionsAnwsers2: Question[]
  }
}

const History: React.FC = () => {
  const data = {
    patient_id: 2,
    questionary_id: 1,
    QuestionsAnwsers1: [
      {
        question: 'Nombre completo',
        answer: 'Pepe',
      },
      {
        question: 'Sexo',
        answer: 'Masculino',
      },
      {
        question: 'Edad',
        answer: 25,
      },
      {
        question: 'Fecha de Nacimiento',
        answer: '1998-01-01',
      },
      {
        question: 'Dirección',
        answer: 'Calle Principal #123',
      },
      {
        question: 'Teléfono',
        answer: '123-456-7890',
      },
      {
        question: 'Correo Electrónico',
        answer: 'example@example.com',
      },
      {
        question: 'Nombre del Contacto de Emergencia',
        answer: 'Juan',
      },
      {
        question: 'Teléfono del Contacto de Emergencia',
        answer: '987-654-3210',
      },
    ],
    QuestionsAnwsers2: [
      {
        question: 'Fecha de inicio',
        answer: '2023-12-15',
      },
      {
        question: 'Evolución',
        answer: 'Mejorando gradualmente',
      },
      {
        question: 'Sintomas',
        answer: 'Dolor de cabeza',
      },
      {
        question: 'Signos',
        answer: 'Presión arterial alta',
      },
      {
        question: 'Factores que agravan/mejoran los sintomas',
        answer: 'El estrés agrava los síntomas',
      },
      {
        question: 'Tratamientos previos',
        answer: 'Analgésicos y descanso',
      },
    ],
  }

  return (
    <>
      <Menu />
      <h1 className="mb-6 text-center text-3xl font-semibold text-primary">
        Historia Clínica
      </h1>
      <div className="mx-auto mt-10 flex max-w-full">
        <div className="mr-2 ml-8 w-1/2 overflow-hidden rounded-lg bg-white shadow-md">
          <div className="border-b p-4">
            <h2 className="mb-2 text-center text-lg font-semibold">
              Datos Personales
            </h2>
            <div className="flex flex-wrap justify-between">
              {data &&
                data.QuestionsAnwsers1 &&
                data.QuestionsAnwsers1.map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 flex w-full items-center justify-between"
                  >
                    <p className="mb-0 text-sm font-semibold">
                      {item.question}:
                    </p>
                    <p className="mb-0 text-sm">{item.answer}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="ml-2 mr-8 w-1/2 overflow-hidden rounded-lg bg-white shadow-md">
          <div className="border-b p-4">
            <h2 className="mb-2 text-center text-lg font-semibold">
              Enfermedad actual
            </h2>
            <div className="flex flex-wrap justify-between">
              {data &&
                data.QuestionsAnwsers2 &&
                data.QuestionsAnwsers2.map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 flex w-full items-center justify-between"
                  >
                    <p className="mb-0 text-sm font-semibold">
                      {item.question}:
                    </p>
                    <p className="mb-0 text-sm">{item.answer}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default History
