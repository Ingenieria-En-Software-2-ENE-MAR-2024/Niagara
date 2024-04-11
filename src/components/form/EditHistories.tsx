import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { getSession } from 'next-auth/react'
import { Button } from '../Button'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'

interface QuestionToShow {
  id: string
  type: string
  question: string
  section: string[]
  options?: string[]
  answers: string
}

interface Question {
  type: string
  question: string
  section: string[]
  options?: string[]
}

interface TransformedData {
  QuestionType: Question[]
}

const OptionTypes: { [key: string]: string } = {
  TEXT: 'Texto',
  NUMBER: 'Número',
  DATE: 'Fecha',
  SIMPLE_SELECT: 'Selección Simple',
  MULTIPLE_SELECT: 'Selección Múltiple',
}

type FormState = {
  sections: {
    id: string
    title: string
    questions: QuestionToShow[]
  }[]
}

export default function EditHistory() {
  const [loading, setLoading] = useState(true)
  const { control, handleSubmit } = useForm()
  const [form, setForm] = useState<FormState>({
    sections: [
      {
        id: uuidv4(),
        title: '',
        questions: [
          {
            id: uuidv4(),
            question: '',
            type: '',
            section: [],
            answers: '',
            options: [],
          },
        ],
      },
    ],
  })

  // get the template from the API
  useEffect(() => {
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
            // Agrupar las preguntas por sección
            const sections: { [key: string]: QuestionToShow[] } = data[
              data.length - 1
            ].questionsType.reduce(
              (acc: any, question: any) => {
                const section = Array.isArray(question.section)
                  ? question.section[0]
                  : question.section
                ;(acc[section] = acc[section] || []).push({
                  id: uuidv4(),
                  question: question.question,
                  type: question.type,
                  answers: '',
                  options: Array.isArray(question.options)
                    ? question.options
                    : [''],
                })
                return acc
              },
              {} as { [key: string]: QuestionToShow[] },
            )

            // Transform the sections object into an array
            const transformedSections = Object.entries(sections).map(
              ([title, questions]) => ({
                id: uuidv4(),
                title,
                questions,
              }),
            )

            setForm({ sections: transformedSections })
            setLoading(false)
          }
        } else {
          console.log('No se pudo obtener el template')
        }
      } catch (error) {
        console.log('Error en la petición')
      }
    }

    getTemplate()
  }, [])

  const addSection = () => {
    setForm((prevForm) => ({
      ...prevForm,
      sections: [
        ...prevForm.sections,
        {
          id: uuidv4(),
          title: '',
          questions: [
            {
              id: uuidv4(),
              question: '',
              type: '',
              section: [],
              answers: '',
              options: [],
            },
          ],
        },
      ],
    }))
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
    setForm((prevForm) => {
      // Hacer una copia profunda del estado anterior
      const newForm = JSON.parse(JSON.stringify(prevForm))

      // Agregar una nueva pregunta a la sección correspondiente
      newForm.sections[sectionIndex].questions.push({
        id: uuidv4(),
        question: '',
        type: '',
        answers: '',
        options: [],
      })

      // Devolver el nuevo estado
      return newForm
    })
  }

  const removeQuestion = (sectionId: string, questionId: string) => {
    console.log(questionId)
    setForm((prevForm) => {
      const newSections = prevForm.sections.map((section) => {
        if (section.id === sectionId) {
          const newQuestions = section.questions.filter(
            (question) => question.id !== questionId,
          );
          return { ...section, questions: newQuestions };
        }
        return section;
      });
      return { sections: newSections };
    });
    console.log(form)
  };

  // send data to API
  const onSubmit = async (form: any) => {
    const session = await getSession()
    const token = session?.user?.accessToken

    const transformedData: TransformedData = {
      QuestionType: [],
    }

    //console.log(form)

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
      section.questions
        .filter((question: any) => question.question.trim() !== '')
        .forEach((question: any) => {
          let options;
          if (typeof question.options === 'string') {
            options = question.options.split(',').map((option: string) => option.trim());
          } else {
            options = question.options;
          }
          transformedData.QuestionType.push({
            type: question.type,
            question: question.question,
            section: [section.title],
            options: options ? options : [],
          });
        });
    });

    console.log(transformedData)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/historyTemplate`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'access-token': `Bearer ${token}`,
          },
          body: JSON.stringify(transformedData),
        },
      )
      if (!response.ok) {
        console.log(
          'Las preguntas del historial clínico no se pudieron actualizar',
        )
        return
      }
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title:
          'Las preguntas del historial clínico se actualizaron correctamente',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        console.log('Las preguntas del historial clínico se actualizaron')
      })
    } catch (e) {
      console.log(
        'Ocurrió un error al actualizar las preguntas del historial clínico',
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

  // console.log(form.sections)

  if (loading) {
    return <div> Cargando... </div>
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
              defaultValue={section.title}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Título de la sección"
                  className="mb-2 mr-2 w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                />
              )}
            />
            <Button
              type="button"
              onClick={() => removeSection(section.id)}
              className="bg-red-500 p-1"
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
                    defaultValue={section.questions[questionIndex].question}
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
                    defaultValue={section.questions[questionIndex].type}
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
                        {Object.entries(OptionTypes).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                {(question.type === 'SIMPLE_SELECT' ||
                  question.type === 'MULTIPLE_SELECT') && (
                  <Controller
                    name={`section-${sectionIndex}-question-${questionIndex}-options`}
                    control={control}
                    defaultValue={section.questions[questionIndex].options}
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
            <AddIcon className="mr-1 inline-block h-5 w-5" />
            Agregar Pregunta
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addSection} className="bg-primary">
        <AddIcon className="mr-1 inline-block h-5 w-5" /> Agregar Sección
      </Button>
      <div className="flex justify-center">
        <Button type="submit" className="bg-primary">
          Actualizar
        </Button>
      </div>
    </form>
  )
}
