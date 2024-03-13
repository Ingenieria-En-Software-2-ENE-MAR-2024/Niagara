export function add_property(
  obj: any,
  property_name: string,
  value: any,
): void {
  obj[property_name] = value
}

export function add_object_to_array<T>(
  array: T[],
  value_name: string,
  value: any,
): T[] {
  let new_object: { [key: string]: any } = {}
  new_object[value_name] = value

  return [...array, new_object] as T[]
}
export function add_object_property<T>(
  input_object: T,
  value_name: string,
  value: any,
): T & { [key: string]: any } {
  const new_object = { ...input_object, [value_name]: value } as T & {
    [key: string]: any
  }
  return new_object
}

/**
 *
 * @param date en formato mm/dd/yy
 * @returns
 */
export const formatDateToDb = (date: string) => {
  const dateArray = date.split('/')
  const dateFormartedForDb = new Date(date)
  return dateFormartedForDb
}

export const formatDateToFront = (date: Date) => {
  // formateamos la fecha para salida en formato  dd/mm/yyyy
  return new Date(date).toLocaleDateString('en-GB')
}

export const verifyDate = (date: Date) => {
  const dateNow = new Date()
  // Para poder comparar fechas, eliminamos la hora, minuto, segundo y milisegundo
  dateNow.setHours(0, 0, 0, 0)
  if (date < dateNow) {
    throw new Error('La fecha debe ser mayor o igual a la fecha actual')
  }
  return true
}
