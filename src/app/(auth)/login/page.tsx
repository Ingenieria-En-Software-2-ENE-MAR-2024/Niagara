'use client'

// import { HeaderNiagara } from '@/components/HeaderNiagara'
// import { redirect, useParams } from 'next/navigation'

// export default function Login() {
//   redirect(new URL('/login', process.env.NEXTAUTH_URL).pathname);
// }

import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { signIn, getSession } from 'next-auth/react'
import { useForm, Controller } from 'react-hook-form'
import React from 'react'
import { useRouter } from 'next/navigation'
import bgMedicine from '../../../public/bgMedicine.jpg'

interface FormData {
  name: string
  email: string
  password: string
  role: string
}

export default function Home() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>()
  const router = useRouter()

  // handle credentials error
  const [credentialsError, setCredentialsError] = React.useState('')

  // handle submit
  const onSubmit = async (data: FormData) => {
    const { email, password } = data

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    // console.log('result: ', result)

    if (result?.error) {
      console.error(result.error)
      if (
        result.error === 'CredentialsSignin' ||
        result.error === 'HTTP error! status: 401'
      ) {
        setCredentialsError('Credenciales inválidas')
      }
    } else {
      const session = await getSession()
      const userRole = session?.user?.role

      // Redirect to the appropriate page based on the user's role
      if (userRole === 'Admin') {
        router.push('/admin')
      } else if (userRole === 'Patient') {
        router.push('/niagarahome')
      } else if (userRole === 'Medic') {
        router.push('/homeMedic')
      }
    }
  }

  // console.log(session?.user)

  return (
    <AuthLayout
      title="Inicio de Sesión"
      subtitle={
        <>
          ¿No tienes cuenta todavía?{' '}
          <Link href="/register" className="text-cyan-600">
            Regístrate
          </Link>{' '}
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Se requiere correo electrónico' }}
            render={({ field }) => (
              <TextField {...field} label="Correo electrónico" type="email" />
            )}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">
              {errors.email?.message?.toString()}
            </p>
          )}

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Se requiere contraseña' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contraseña"
                type="password"
                className="mt-6"
              />
            )}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password?.message?.toString()}
            </p>
          )}

          {/* Show error message if credentials are invalid */}
          {credentialsError && (
            <p className="mt-4 text-center text-sm text-red-500">
              {credentialsError}
            </p>
          )}
        </div>
        <Button type="submit" className="mt-6 w-full bg-primary">
          Inicia sesión
        </Button>
      </form>
    </AuthLayout>
  )
}
