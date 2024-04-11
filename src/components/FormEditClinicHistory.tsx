'use client'

import React, { useEffect, useState } from 'react'
import { SelectField } from '@/components/Fields'
import { Button } from '@/components/Button'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  TextField,
  TabScrollButton,
  Radio,
} from '@mui/material'
import { getSession } from 'next-auth/react'
import Swal from 'sweetalert2'

export interface Question {
  question: string
  type: string
  options: string | null
  result?: string
}

export interface Section {
  title: string
  questions: Question[]
}

interface ModalUserProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
  id: number
  onChange: any
}

interface QuestionAnswer {
  question: string
  answer: string | number | string[]
}

export const FormEditClinicHistory: React.FC<ModalUserProps> = ({
  open,
  setOpen,
  edit,
  id,
  onChange = undefined,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState<Section[]>([])
  const [isQuestionsAnwsersNull, setIsQuestionsAnwsersNull] =
    useState<boolean>(true)
  const [patientID, setPatientID] = useState<number>(0)
  const [questionaryID, setQuestionaryID] = useState<number>(0)

  const handleChange = (
    sectionIndex: number,
    questionIndex: number,
    newValue: string | boolean | string[],
  ) => {
    const updatedFormData = [...formData]
    updatedFormData[sectionIndex].questions[questionIndex].result =
      newValue.toString()
    setFormData(updatedFormData)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  // submit the form
  const handleSubmitDialog = async () => {
    const session = await getSession()
    const token = session?.user?.accessToken

    // transform the data to the backend format
    const transformedData = {
      patient_id: patientID,
      questionary_id: questionaryID,
      QuestionsAnwsers: formData.flatMap((section) =>
        section.questions.map((question) => ({
          question: question.question,
          answer: question.type === 'MULTIPLE_SELECT' 
            ? question.result?.split(',') 
            : question.type === 'NUMBER' 
              ? Number(question.result) 
              : question.result,
        })),
      ),
    }

    console.log(transformedData)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/medicalHistory`,
        {
          method: isQuestionsAnwsersNull ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'access-token': `Bearer ${token}`,
          },
          body: JSON.stringify(transformedData),
        },
      )

      if (!response.ok) {
        console.log('ClinicHistory could not be edited')
        return
      }

      Swal.fire({
        icon: 'success',
        title: '¡Hecho!',
        text: isQuestionsAnwsersNull ? 'Historial clínico creado con éxito.' : 'Historial clínico editado con éxito.',
      })
      
      console.log('ClinicHistory edited')
      if (onChange != undefined) onChange()
    } catch (e) {
      console.log('An error ocurred editing the Clinic History')
      return
    } finally {
      setOpen(false)
    }
  }

  // get the data from the backend
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession()
      const token = session?.user?.accessToken
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
        console.log(data)

        setPatientID(data.patient_id)
        setQuestionaryID(data.questionary.id)

        // Transformar los datos del backend a la estructura de formData
        const sectionsMap = new Map()

        let answersMap: { [key: string]: string | number | string[] } = {}
        if (data.questionsAnwsers) {
          setIsQuestionsAnwsersNull(false)
          data.questionsAnwsers.forEach((qa: QuestionAnswer) => {
            answersMap[qa.question] = qa.answer
          })
        }

        data.questionary.questionsType.forEach((questionType: any) => {
          questionType.section.forEach((sectionTitle: any) => {
            if (!sectionsMap.has(sectionTitle)) {
              sectionsMap.set(sectionTitle, {
                title: sectionTitle,
                questions: [],
              })
            }

            const section = sectionsMap.get(sectionTitle)
            section.questions.push({
              question: questionType.question,
              type: questionType.type,
              options: questionType.options.join(','),
              result: answersMap[questionType.question] || '',
            })
          })
        })

        const newFormData = Array.from(sectionsMap.values())
        setFormData(newFormData)
      } catch (error) {
        console.error(
          'An error occurred while retrieving the Clinic History:',
          error,
        )
        setOpen(false)
      }
    }

    fetchData()
  }, [id, setOpen]) // Add dependencies

  //console.log(formData)

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {'Edición de historia clínica'}
        </DialogTitle>

        <DialogContent>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {formData.map((section, index) => (
              <Tab key={index} label={section.title} />
            ))}
          </Tabs>
          <div>
            {formData[activeTab] &&
              formData[activeTab].questions.map((question, questionIndex) => (
                <div key={questionIndex} style={{ marginTop: '16px' }}>
                  {['TEXT'].includes(question.type) && (
                    <TextField
                      label={question.question}
                      value={question.result || ''}
                      onChange={(e) =>
                        handleChange(activeTab, questionIndex, e.target.value)
                      }
                      fullWidth
                      margin="normal"
                      disabled={!edit}
                    />
                  )}
                  {question.type === 'NUMBER' && (
                    <TextField
                      label={question.question}
                      type="number"
                      value={question.result || ''}
                      onChange={(e) =>
                        handleChange(activeTab, questionIndex, e.target.value)
                      }
                      fullWidth
                      margin="normal"
                      disabled={!edit}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                  {question.type === 'DATE' && (
                    <TextField
                      label={question.question}
                      type="date"
                      value={question.result || ''}
                      onChange={(e) =>
                        handleChange(activeTab, questionIndex, e.target.value)
                      }
                      fullWidth
                      margin="normal"
                      disabled={!edit}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                  {question.type === 'SIMPLE_SELECT' && (
                    <>
                      <div>{question.question}</div>
                      {question.options
                        ?.split(',')
                        .map((option, optionIndex) => (
                          <FormControlLabel
                            key={optionIndex}
                            control={
                              <Radio
                                checked={question.result === option}
                                onChange={(e) =>
                                  handleChange(activeTab, questionIndex, option)
                                }
                                disabled={!edit}
                              />
                            }
                            style={{ margin: '5px 0' }}
                            label={option.trim()}
                          />
                        ))}
                    </>
                  )}
                  {question.type === 'MULTIPLE_SELECT' && (
                    <>
                      <div>{question.question}</div>
                      {question.options
                        ?.split(',')
                        .map((option, optionIndex) => {
                          let result: string | string[] = Array.isArray(question.result)
                            ? question.result
                            : typeof question.result === 'string'
                              ? question.result.split(',')
                              : []
                          let isChecked = result.includes(option.trim())
                          return (
                            <FormControlLabel
                              key={optionIndex}
                              control={
                                <Checkbox
                                  checked={isChecked}
                                  onChange={(e) => {
                                    let newOptions: string[] = Array.isArray(result)
                                      ? result
                                      : typeof result === 'string'
                                      ? result.split(',')
                                      : [];
                                    if (e.target.checked) {
                                      newOptions.push(option.trim());
                                    } else {
                                      const index = newOptions.indexOf(option.trim());
                                      if (index !== -1) {
                                        newOptions.splice(index, 1);
                                      }
                                    }
                                    // Aquí es donde actualizas el estado con las nuevas opciones
                                    handleChange(
                                      activeTab,
                                      questionIndex,
                                      newOptions.filter(Boolean).join(','),
                                    );
                                  }}
                                  disabled={!edit}
                                />
                              }
                              style={{ margin: '5px 0' }}
                              label={option.trim()}
                            />
                          )
                        })}
                    </>
                  )}
                </div>
              ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Cerrar
          </Button>
          <Button
            onClick={handleSubmitDialog}
            style={{ backgroundColor: 'green', color: 'white' }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
