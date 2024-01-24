"use client";
import { components } from "./FormItems";

const response = {
  loading: false,
  error: null,
  data: {
    id: "unique_form_identifier",
    title: "titulo del formulario s",
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
                const Component = components[field.type];

                if (Component) {
                  return <Component key={index} field={field} />;
                }
                
                return null;
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

