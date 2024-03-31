'use client'
import { useEffect, useState } from 'react'
import { components } from './FormItems'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../Button'
import { SelectField } from '../Fields'

export default function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    control,
  } = useForm()

  const [formData, setFormData] = useState<any>({
    loading: true,
    data: null,
    error: null,
  })


  const serverUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  useEffect(() => {
    axios
      .get(`${serverUrl}/api/forms`)
      .then((response) => {
        setFormData({
          loading: response.data === null || false,
          data: response.data,
          error: null,
        })
        setValue('data', response.data?.questions)

      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [serverUrl, setValue])

  const onSubmit = async ({ data }: any) => {
    console.log(data)

    axios
      .post(`${serverUrl}/api/forms`, {
        id_form: formData.data.id,
        answers: data,
      })
      .catch((error) => {
        console.error('Error:', error)
      })

  }

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        {formData.loading ? (
          <h2> Loading...</h2>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          >
            <div>
              <h2 className="text-lg font-medium">
                {!formData.loading && formData.data.title}
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                {!formData.loading &&
                  formData.data.questions.map((field: any, index: number) => {
                    const Component = components[field.type]
                    const label = field.label
                    const options = field.options


                    if (Component) {
                      return (
                        <Controller
                        key={index}
                          name={`data[${index}].answer`}
                          control={control}
                          defaultValue=""
                          render={({ field: myfield }) => (
    
                            <Component
                              
                              label={label}
                              {...myfield}
                            />
                          )}
                        />
                      )
                    } else if (field.type === 'single-choice') {
                      return (
                        <Controller
                        key={index}
                          name={`data[${index}].answer`}
                          control={control}
                          defaultValue=""
                          render={({ field: myfield }) => (
                            <SelectField
                              label={label}
                              {...myfield}
                            >
                              {
                                options.map((option: any, index: number) => { 
                                  return (
                                    <option key={index}>{option}</option>
                                  )
                                 })
                              }
                            </SelectField>
                          )}
                        />
                      )

                    } else if (field.type === 'multiple-choice') {
                      return (
                        <div key={index} className="">
                          <label
                            htmlFor=""
                            className="block text-sm font-medium"
                          >
                            {field.label}
                          </label>
                          <div className="mt-1">
                            {field.options.map((option: any, index: number) => (
                              <div key={index} className="flex items-start">
                                <div className="flex h-5 items-center">
                                  <input
                                    id={`${field.id}-${index}`}
                                    name={field.id}
                                    type="checkbox"
                                    className="focus:ring-myblue text-myblue h-4 w-4 rounded border-gray-300"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor={`${field.id}-${index}`}
                                    className="font-medium text-gray-700"
                                  >
                                    {option}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    } else if (field.type === 'file-upload') {
                      return (
                        <div key={index}>
                          <label
                            htmlFor={field.id}
                            className="block text-sm font-medium"
                          >
                            {field.label}
                          </label>
                          <div className="mt-1">
                            <input
                              type="file"
                              id={field.id}
                              name={field.id}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      )
                    }

                    return null
                  })}
              </div>
              <Button>Enviar</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
