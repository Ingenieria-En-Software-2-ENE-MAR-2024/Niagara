import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { getSession } from 'next-auth/react'
import { Button } from '../Button'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'

interface Question {
  type: string
  question: string
  section: string[]
  options: string[]
}

interface TransformedData {
  QuestionType: Question[]
}

export default function History() {
  const [token, setToken] = useState<any>(null)
  const { control, handleSubmit } = useForm()
  const [form, setForm] = useState({
    sections: [
      {
        id: uuidv4(),
        title: '',
        questions: [
          {
            id: uuidv4(),
            question: '',
            type: '',
            answers: '',
            options: '',
          },
        ],
      },
    ],
  })

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        {
          id: uuidv4(),
          title: '',
          questions: [
            {
              id: uuidv4(),
              question: '',
              type: '',
              answers: '',
              options: '',
            },
          ],
        },
      ],
    })
  }

  const removeSection = (sectionId: string) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        sections: prevForm.sections.filter(
          (section) => section.id !== sectionId,
        ),
      }
    })
  }

  const addQuestion = (sectionIndex: number) => {
    const newSections = [...form.sections]
    newSections[sectionIndex].questions.push({
      id: uuidv4(),
      question: '',
      type: '',
      answers: '',
      options: '',
    })
    setForm({ ...form, sections: newSections })
  }

  const removeQuestion = (sectionId: string, questionId: string) => {
    setForm((prevForm) => {
      const newSections = prevForm.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.filter(
              (question) => question.id !== questionId,
            ),
          }
        } else {
          return section
        }
      })
      return { ...prevForm, sections: newSections }
    })
  }

  const onSubmit = async (form: any) => {
    const session = await getSession()
    const token = session?.user?.accessToken

    const transformedData: TransformedData = {
      QuestionType: [],
    }

    // Extraer las claves del formulario
    const keys = Object.keys(form)

    // Agrupar las preguntas por sección
    const sections: any = {}
    keys.forEach((key) => {
      const [prefix, sectionIndex, question, questionIndex, field] =
        key.split('-')
      if (prefix === 'section' && question) {
        if (!sections[sectionIndex]) {
          sections[sectionIndex] = {
            title: form[`section-${sectionIndex}`],
            questions: [],
          }
        }
        if (!sections[sectionIndex].questions[questionIndex]) {
          sections[sectionIndex].questions[questionIndex] = {
            type: '',
            question:
              form.sections[sectionIndex].questions[questionIndex].question,
            options: '',
          }
        }
        sections[sectionIndex].questions[questionIndex][field] = form[key]
      }
    })

    // Transformar las secciones y preguntas al formato requerido
    Object.values(sections).forEach((section: any) => {
      section.questions.forEach((question: any) => {
        transformedData.QuestionType.push({
          type: question.type,
          question: question.question,
          section: [section.title],
          options: question.options ? question.options.split(',') : [],
        })
      })
    })

    // console.log(transformedData)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/historyTemplate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'access-token': `Bearer ${token}`,
          },
          body: JSON.stringify(transformedData),
        },
      )
      if (!response.ok) {
        console.log('Las preguntas del historial clínico no se pudieron enviar')
        return
      }
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Las preguntas del historial clínico se enviaron correctamente',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        console.log('Las preguntas del historial clínico se guardaron')
      })
    } catch (e) {
      console.log(
        'Ocurrió un error al guardar las preguntas del historial clínico',
      )
      return
    }
  }

  const handleTypeChange = (
    type: string,
    sectionIndex: number,
    questionIndex: number,
  ) => {
    const newSections = [...form.sections]
    newSections[sectionIndex].questions[questionIndex].type = type
    setForm({ ...form, sections: newSections })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      {form.sections.map((section, sectionIndex) => (
        <div
          key={section.id}
          className="space-y-2 border-b-2 border-gray-200 pb-4"
        >
          <div className="flex items-center justify-between">
            <Controller
              name={`section-${sectionIndex}`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Título de la sección"
                  className="mb-2 w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                />
              )}
            />
            <Button
              type="button"
              onClick={() => removeSection(section.id)}
              className="mb-2 ml-2 bg-red-500 p-1"
            >
              <DeleteIcon className="mr-1 inline-block h-5 w-5" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {section.questions.map((question, questionIndex) => (
              <div key={question.id} className="w-full space-y-2">
                <div className="flex items-center justify-between">
                  <Controller
                    name={`sections[${sectionIndex}].questions[${questionIndex}].question`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Pregunta"
                        className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                      />
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => removeQuestion(section.id, question.id)}
                    className="ml-2 bg-red-500 p-1"
                  >
                    <DeleteIcon className="mr-1 inline-block h-5 w-5" />
                  </Button>
                </div>
                <div className="w-full">
                  <Controller
                    name={`section-${sectionIndex}-question-${questionIndex}-type`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                        onChange={(e) => {
                          field.onChange(e)
                          handleTypeChange(
                            e.target.value,
                            sectionIndex,
                            questionIndex,
                          )
                        }}
                      >
                        <option value="">
                          Selecciona el tipo de respuesta
                        </option>
                        <option value="TEXT">Texto</option>
                        <option value="NUMBER">Número</option>
                        <option value="DATE">Fecha</option>
                        <option value="SIMPLE_SELECT">Selección Simple</option>
                        <option value="MULTIPLE_SELECT">
                          Selección Múltiple
                        </option>
                      </select>
                    )}
                  />
                </div>

                {(question.type === 'SIMPLE_SELECT' ||
                  question.type === 'MULTIPLE_SELECT') && (
                  <Controller
                    name={`section-${sectionIndex}-question-${questionIndex}-options`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Opciones (separadas por comas)"
                        className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                      />
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={() => addQuestion(sectionIndex)}
            className="bg-primary"
          >
            <AddIcon className="mr-1 inline-block h-5 w-5" /> Agregar Pregunta
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addSection} className="bg-primary">
        <AddIcon className="mr-1 inline-block h-5 w-5" /> Agregar Sección
      </Button>
      <div className="flex justify-center">
        <Button type="submit" className="bg-primary">
          Enviar
        </Button>
      </div>
    </form>
  )
}
