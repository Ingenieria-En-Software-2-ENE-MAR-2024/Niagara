'use client'

import React, { useState } from 'react' 
import Menu from '@/components/Menu'
import History from '@/components/form/CreateHistories'
import { Template } from '@/components/form/HistoryTemplate'
import { Question } from '@/components/form/HistoryTemplate'
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material' 
import EditHistory from '@/components/form/EditHistories'


export default function CreateMedicalHistoryPage() {
  const existTemplate = true
  const [edit, setEdit] = useState(false)
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

  const handleEditPage = () => {
    setEdit(true)
    console.log('Editando')
  }

  return (
    <>
      <Menu />
      <div className="flex w-full flex-col items-center justify-center py-2">
        <h1 className="text-2xl font-bold">Historia Clínica</h1>
        <div className="mx-auto mt-4 w-full max-w-2xl">
          {existTemplate && 
            <>
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  style={{
                    minWidth: 'auto',
                    backgroundColor: '#1e1b4b',
                    borderRadius: '5px',
                    marginBottom: '0%'
                  }}
                  onClick={() => handleEditPage()}
                >
                  Editar perfil
                </Button>
              </div>
              <Template items={template as Question[]} />
              <EditHistory />
            </>
          }
          {edit && <EditHistory />}
          {!existTemplate && <History />}
        </div>
      </div>
    </>
  )
}
