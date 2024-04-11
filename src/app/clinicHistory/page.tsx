'use client'

import React, { useEffect, useState } from 'react'
import Menu from '@/components/Menu'
import { getSession } from 'next-auth/react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer'

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

// Estilos para el documento
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 2,
    padding: 1,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 10,
  },
})

// Componente para generar el PDF
const MyDocument = ({ data }: { data: HistoryProps }) => (
  <Document>
    <Page style={styles.page}>
      {Object.entries(data).map(([sectionTitle, questions], index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
          {questions.map((item: any, index: any) => (
            <Text key={index} style={styles.question}>
              {item.question}:{" "}
              <Text style={styles.answer}>
                {Array.isArray(item.answer) ? item.answer.join(', ') : item.answer}
              </Text>
            </Text>
          ))}
        </View>
      ))}
    </Page>
  </Document>
)

// Componente para descargar el PDF
const DownloadPDFButton = ({ data }: { data: HistoryProps }) => (
  <div className="mt-4 flex justify-center">
    <PDFDownloadLink
      document={<MyDocument data={data} />}
      fileName="historia_clinica.pdf"
      className="rounded bg-primary px-4 py-2 text-white transition-colors hover:bg-tertiary"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Cargando documento...' : 'Descargar Historia Clínica'
      }
    </PDFDownloadLink>
  </div>
)

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

        // Agrupar las preguntas por sección
        const sections = data.questionary.questionsType.reduce(
          (acc: any, questionType: any) => {
            questionType.section.forEach((sectionTitle: any) => {
              if (!acc[sectionTitle]) {
                acc[sectionTitle] = []
              }

              const answer = data.questionsAnwsers.find(
                (qa: any) => qa.question === questionType.question,
              )

              acc[sectionTitle].push({
                question: questionType.question,
                answer: answer ? answer.answer : '',
              })
            })

            return acc
          },
          {},
        )

        setData(sections)
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
        {data &&
          Object.entries(data).map(([sectionTitle, questions], index) => (
            <div
              key={index}
              className={`${
                index % 2 === 0 ? 'ml-8 mr-2' : 'ml-2 mr-8'
              } w-1/2 overflow-hidden rounded-lg bg-white shadow-md`}
            >
              <div className="border-b p-4">
                <h2 className="mb-2 text-center text-lg font-semibold">
                  {sectionTitle}
                </h2>
                <div className="flex flex-wrap justify-between">
                  {questions.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="mb-4 flex w-full items-center justify-between"
                    >
                      <p className="mb-0 text-sm font-semibold">
                        {item.question}:
                      </p>
                      <p className="mb-0 text-sm">
                        {Array.isArray(item.answer)
                          ? item.answer.join(', ')
                          : item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      {data && <DownloadPDFButton data={data} />}
    </>
  )
}

export default History
