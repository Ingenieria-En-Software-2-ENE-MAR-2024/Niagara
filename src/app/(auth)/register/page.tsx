'use client'

import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'

interface FormData {
  name: string
  email: string
  password: string
  role: string
}

export default function Register() {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>()

  // handle submit
  const onSubmit = async (data: FormData) => {
    const { name, email, password, role } = data

    // console.log('data', data)

    const response = await fetch(
      new URL('api/users', process.env.NEXT_PUBLIC_BASE_URL),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      },
    )

    if (response.ok) {
      console.log('Usuario creado correctamente')
      router.push('/')
    } else {
      const data = await response.json()
      console.error(data.error_message)
    }
  }

  return (
    <AuthLayout
      title="Registro"
      subtitle={
        <>
          ¿Ya tienes cuenta?{' '}
          <Link href="/" className="text-cyan-600">
            Inicia sesión.
          </Link>{' '}
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: 'Se requiere el nombre',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres',
              },
              maxLength: {
                value: 50,
                message: 'El nombre debe tener menos de 50 caracteres',
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'El nombre solo puede contener letras y espacios',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                type="text"
                className="col-span-full"
              />
            )}
          />
          {errors.name && (
            <p className="col-span-full mt-2 text-sm text-red-500">
              {errors.name?.message?.toString()}
            </p>
          )}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Se requiere correo electrónico',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i,
                message: 'Correo electrónico inválido',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Correo electrónico"
                type="email"
                className="col-span-full mt-6"
              />
            )}
          />
          {errors.email && (
            <p className="col-span-full mt-2 text-sm text-red-500">
              {errors.email?.message?.toString()}
            </p>
          )}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Se requiere contraseña',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contraseña"
                type="password"
                className="col-span-full mt-6"
              />
            )}
          />
          {errors.password && (
            <p className="col-span-full mt-2 text-sm text-red-500">
              {errors.password?.message?.toString()}
            </p>
          )}

          <Controller
            name="role"
            control={control}
            defaultValue="Admin"
            render={({ field }) => (
              <SelectField
                {...field}
                className="col-span-full mt-6"
                label="Tipo de usuario"
              >
                <option value="admin">Admin</option>
                <option value="patient">Paciente</option>
                <option value="medical">Doctor</option>
              </SelectField>
            )}
          />
        </div>

        <Button type="submit" className="mt-8 w-full bg-primary">
          Regístrate
        </Button>
      </form>
    </AuthLayout>
  )
}
