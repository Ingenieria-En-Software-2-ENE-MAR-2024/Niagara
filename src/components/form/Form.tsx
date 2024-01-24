/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

"use client";

const response = {
  loading: false,
  error: null,
  data: {
    id: "unique_form_identifier",
    title: "Formulario numero 1",
    questions: [
      {
        id: "q1",
        type: "single-choice",
        label: "Pregunta de Selección Simple",
        options: ["Opción 1", "Opción 2", "Opción 3"],
      },
      {
        id: "q2",
        type: "multiple-choice",
        label: "Pregunta de Selección Múltiple",
        options: ["Opción A", "Opción B", "Opción C"],
      },
      {
        id: "q3",
        type: "file-upload",
        label: "Carga de Archivos",
      },
      {
        id: "q4",
        type: "short-text",
        label: "Área de Texto Corto",
      },
      {
        id: "q5",
        type: "long-text",
        label: "Área de Texto Largo",
      },
    ],
  },
};

export default function Form() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <h2 className="text-lg font-medium">{response.data.title}</h2>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              {response.data.questions.map((field: any, index: number) => {
                if (field.type === "short-text" || field.type === "long-text") {
                  return (
                    <div key={index}>
                      <label htmlFor={field.id} className="block text-sm font-medium">
                        {field.label}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id={field.id}
                          name={field.id}
                          autoComplete="given-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  );
                } else if (field.type === "single-choice") {
                  return (
                    <div key={index} className="">
                      <label htmlFor="" className="block text-sm font-medium">
                        {field.label}
                      </label>
                      <div className="mt-1">
                        <select
                          defaultValue=""
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-myblue focus:ring-myblue sm:text-sm"
                        >
                          <option value="" disabled>
                            Seleccione la entrada
                          </option>
                          {field.options.map((option: any, index: number) => {
                            return (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  );
                } else if (field.type === "multiple-choice") {
                  return (
                    <div key={index} className="">
                      <label htmlFor="" className="block text-sm font-medium">
                        {field.label}
                      </label>
                      <div className="mt-1">
                        {field.options.map((option: any, index: number) => {
                          return (
                            <div key={index} className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id={`${field.id}-${index}`}
                                  name={field.id}
                                  type="checkbox"
                                  className="focus:ring-myblue h-4 w-4 text-myblue border-gray-300 rounded"
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
                          );
                        })}
                      </div>
                    </div>
                  );
                } else if (field.type === "file-upload") {
                  return (
                    <div key={index}>
                      <label htmlFor={field.id} className="block text-sm font-medium">
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
                  );
                }
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
