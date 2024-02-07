export interface IFormQuestion {
  id: string;
  type: string;
  label: string;
  options?: string[] | null;
}


// Define los componentes para cada tipo de pregunta
function ShortTextComponent({ field }: { field: IFormQuestion }) {
    return (
      <div>
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
  }
  
  function LongTextComponent({ field }: { field: any }) {
    return (
      <div>
        <label htmlFor={field.id} className="block text-sm font-medium">
          {field.label}
        </label>
        <div className="mt-1">
          <textarea
            id={field.id}
            name={field.id}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
      </div>
    );
  }
  
  function SingleChoiceComponent({ field }: { field: any }) {
    return (
      <div className="">
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
            {field.options.map((option: any, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
  
  function MultipleChoiceComponent({ field }: { field: any }) {
    return (
      <div className="">
        <label htmlFor="" className="block text-sm font-medium">
          {field.label}
        </label>
        <div className="mt-1">
          {field.options.map((option: any, index: number) => (
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
          ))}
        </div>
      </div>
    );
  }
  
  function FileUploadComponent({ field }: { field: any }) {
    return (
      <div>
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


  export type componentOption = {
    [key: string]: React.FC<{ field: IFormQuestion }>
  }
  
  
  
  export const components: componentOption = {
    'short-text': ShortTextComponent,
    'long-text': LongTextComponent,
    'single-choice': SingleChoiceComponent,
    'multiple-choice': MultipleChoiceComponent,
    'file-upload': FileUploadComponent,
  }
  
  // export const components = {
  //   'short-text': ShortTextComponent,
  //   'long-text': LongTextComponent,
  //   'single-choice': SingleChoiceComponent,
  //   'multiple-choice': MultipleChoiceComponent,
  //   'file-upload': FileUploadComponent,
  // };



  