'use client'

import React, { useState, useEffect } from 'react'
import Menu from '@/components/Menu'
import { Template } from '@/components/form/HistoryTemplate'
import { Question } from '@/components/form/HistoryTemplate'
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'

export default function MedicalHistoryPage() {
  const existTemplate = true
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const [template, setTemplate] = useState([])

  const getTemplate = async () => {
    const session = await getSession()
    const token = session?.user?.accessToken

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/historyTemplate`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access-token': `Bearer ${token}`,
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) {
          setTemplate(data[0].questionsType)
        }
      } else {
        console.log('No se pudo obtener el template')
      }
    } catch (error) {
      console.log('Error en la petición')
    }
  }

  useEffect(() => {
    getTemplate()
  }, [])

  const handleEditPage = () => {
    setEdit(true)
    router.push('/editMedicalHistory')
  }

  const handleCreatePage = () => {
    router.push('/createMedicalHistory')
  }

  // console.log(template)

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
