import { useEffect, useState } from 'react'
import { components } from './FormItems'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../Button'
import { SelectField } from '../Fields'
import AddIcon from '@mui/icons-material/Add'

export default function History() {
  const { control, handleSubmit } = useForm()
  const [form, setForm] = useState({
    sections: [
      {
        title: '',
        questions: [
          {
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
          title: '',
          questions: [
            {
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

  const addQuestion = (sectionIndex: number) => {
    const newSections = [...form.sections]
    newSections[sectionIndex].questions.push({
      question: '',
      type: '',
      answers: '',
      options: '',
    })
    setForm({ ...form, sections: newSections })
  }

  const onSubmit = (form: any) => {
    console.log(form)
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
          key={sectionIndex}
          className="space-y-2 border-b-2 border-gray-200 pb-4"
        >
          <Controller
            name={`section-${sectionIndex}`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Título de la sección"
                className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 mb-2"
              />
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            {section.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="w-full space-y-2">
                <Controller
                  name={`section-${sectionIndex}-question-${questionIndex}`}
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
                        <option value="MULTIPLE_SELECT">Selección Múltiple</option>
                      </select>
                    )}
                  />
                </div>

                {(question.type === "SIMPLE_SELECT" || question.type === "MULTIPLE_SELECT" ) && (
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
      <div className='flex justify-center'>
        <Button type="submit" className="bg-primary">
          Enviar
        </Button>
      </div>
    </form>
  )
}
