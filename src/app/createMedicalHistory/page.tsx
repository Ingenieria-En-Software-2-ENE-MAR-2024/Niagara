'use client'

import React, { useState } from 'react' 
import Menu from '@/components/Menu'
import Histories from '@/components/form/CreateHistories'
import { Template } from '@/components/form/HistoryTemplate'
import { Question } from '@/components/form/HistoryTemplate'


export default function CreateMedicalHistoryPage() {
  const existTemplate = true
  const [template, setTemplate] = useState([
    {
      type: "TEXT",
      section: ["Datos Personales"],
      question: "Nombre",
    },
    {
      type: "SIMPLE_SELECT",
      section: ["Datos Personales"],
      question: "Género",
      options: ["Masculino", "Femenino", "Otro"],
    },
    {
      type: "TEXT",
      section: ["Datos Laborales"],
      question: "Ocupación",
    }
  ])

  return (
    <>
      <Menu />
      <div className="flex w-full flex-col items-center justify-center py-2">
        <h1 className="text-2xl font-bold">Historia Clínica</h1>
        <div className="mx-auto mt-4 w-full max-w-2xl">
          {existTemplate && <Template items={template as Question[]} />}
          {!existTemplate && <Histories />}
        </div>
      </div>
    </>
  )
}
