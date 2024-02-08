import clsx from 'clsx'
import { useId } from 'react'

const formClasses =
  'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'

function Label({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-semibold text-gray-900"
    >
      {children}
    </label>
  )
}

export function TextField({
  label,
  type = 'text',
  register,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'input'>, 'id'> & {
  label?: string
  register?: any
}) {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input
        {...register}
        id={id}
        type={type}
        {...props}
        className={formClasses}
      />
    </div>
  )
}

export function TextArea({
  label,
  cols,
  register,
  type = 'text',
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'input'>, 'id'> & {
  label?: string
  cols?: number
  register?: any
}) {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <textarea {...register} id={id} rows={5} className={formClasses} />
    </div>
  )
}

export function SelectField({
  label,
  className,
  options,
  register,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'select'>, 'id'> & {
  label?: string
  options?: any[]
  register?: any
}) {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select {...register} id={id} {...props} className={clsx(formClasses, 'pr-8')}>
        <option value="" disabled>
          Seleccione la entrada
        </option>
        {options?.map((option: any, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
