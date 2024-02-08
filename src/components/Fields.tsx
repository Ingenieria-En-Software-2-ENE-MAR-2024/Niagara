import clsx from 'clsx'
import React, { useId } from 'react'

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

export const TextField = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'> & {
    label?: string
    className?: string
  }
>(({ label, type = 'text', className, ...props }, ref) => {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input ref={ref} id={id} type={type} {...props} className={formClasses} />
    </div>
  )
})

export const SelectField = React.forwardRef<
  HTMLSelectElement,
  Omit<React.ComponentPropsWithoutRef<'select'>, 'id'> & {
    label?: string
    className?: string
  }
>(({ label, className, ...props }, ref) => {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select
        ref={ref}
        id={id}
        {...props}
        className={clsx(formClasses, 'pr-8')}
      />
    </div>
  )
})

TextField.displayName = 'TextField'
SelectField.displayName = 'SelectField'
