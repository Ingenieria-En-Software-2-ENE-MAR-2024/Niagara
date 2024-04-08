'use client'

import React, { useState } from 'react'
import Menu from '@/components/Menu'
import { Template } from '@/components/form/HistoryTemplate'
import { Question } from '@/components/form/HistoryTemplate'
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function MedicalHistoryPage() {
  const existTemplate = true
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const [template, setTemplate] = useState([
    {
      type: 'TEXT',
      section: ['Datos Personales'],
      question: 'Nombre',
    },
    {
      type: 'SIMPLE_SELECT',
      section: ['Datos Personales'],
      question: 'Género',
      options: ['Masculino', 'Femenino', 'Otro'],
    },
    {
      type: 'TEXT',
      section: ['Datos Laborales'],
      question: 'Ocupación',
    },
    {
      type: 'SIMPLE_SELECT',
      section: ['Antecedentes Clínicos'],
      question: '¿Tiene alguna enfermedad crónica?',
      options: ['Sí', 'No'],
    },
  ])

  const handleEditPage = () => {
    setEdit(true)
    router.push('/editMedicalHistory')
  }

  const handleCreatePage = () => {
    router.push('/createMedicalHistory')
  }

  return (
    <>
      <Menu />
      <div className="flex w-full flex-col items-center justify-center py-2">
        <h1 className="text-2xl font-bold">Historia Clínica</h1>
        <div className="mx-auto mt-4 w-full max-w-5xl">
          {existTemplate && (
            <>
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  style={{
                    minWidth: 'auto',
                    backgroundColor: '#1e1b4b',
                    borderRadius: '5px',
                    marginBottom: '0%',
                  }}
                  onClick={() => handleCreatePage()}
                >
                  Crear Template
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  style={{
                    minWidth: 'auto',
                    backgroundColor: '#1e1b4b',
                    borderRadius: '5px',
                    marginBottom: '0%',
                    marginLeft: '10px',
                  }}
                  onClick={() => handleEditPage()}
                >
                  Editar Template
                </Button>
              </div>
              <Template items={template as Question[]} />
            </>
          )}
        </div>
      </div>
    </>
  )
}
