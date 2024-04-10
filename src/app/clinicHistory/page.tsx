'use client'

import React, { useEffect, useState } from 'react'
import Menu from '@/components/Menu'
import { getSession } from 'next-auth/react'

interface Question {
  question: string
  answer: string | number | string[]
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
  const [data, setData] = useState<HistoryProps | null>(null)

  // get the information from the api
  useEffect(() => {
    const getData = async () => {
      const session = await getSession()
      const token = session?.user?.accessToken
      const id = session?.user?.id

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/medicalHistory/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'access-token': `Bearer ${token}`,
            },
          },
        )

        if (!response.ok) {
          throw new Error('ClinicHistory could not be retrieved')
        }

        console.log('ClinicHistory model successfully retrieved')
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error(
          'An error occurred while retrieving the Clinic History:',
          error,
        )
      }
    }
    getData()
  }, [])

  console.log(data)

  return (
    <>
      <Menu />
      <h1 className="mb-6 text-center text-3xl font-semibold text-primary">
        Historia Clínica
      </h1>
      <div className="mx-auto mt-10 flex max-w-full">
        <div className="ml-8 mr-2 w-1/2 overflow-hidden rounded-lg bg-white shadow-md">
          <div className="border-b p-4">
            <h2 className="mb-2 text-center text-lg font-semibold">
              Datos Personales
            </h2>
            <div className="flex flex-wrap justify-between">
              {/* {data &&
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
                ))} */}
            </div>
          </div>
        </div>
        <div className="ml-2 mr-8 w-1/2 overflow-hidden rounded-lg bg-white shadow-md">
          <div className="border-b p-4">
            <h2 className="mb-2 text-center text-lg font-semibold">
              Enfermedad actual
            </h2>
            <div className="flex flex-wrap justify-between">
              {/* {data &&
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
                ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default History
