'use client'
import { useEffect, useState } from 'react'
import { components } from './FormItems'
import axios from 'axios'

export default function Form() {
  const [formData, setFormData] = useState({
    loading: true,
    data: null,
    error: null,
  })
  
  const serverUrl = process.env.SERVER_URL || 'http://localhost:3000'

  useEffect(() => {
    axios.get(`${serverUrl}/api/forms`) 
    .then(response => {
      setFormData({
        loading: false,
        data: response.data,
        error: null,});
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [serverUrl])

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        {formData.loading && <h2> Loading...</h2>}
        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <h2 className="text-lg font-medium">
              {!formData.loading && formData.data.title}
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              {!formData.loading &&
                formData.data.questions.map((field: any, index: number) => {
                  const Component = components[field.type]

                  if (Component) {
                    return <Component key={index} field={field} />
                  }

                  return null
                })}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
