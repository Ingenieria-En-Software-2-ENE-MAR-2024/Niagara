'use client'

import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
// import { type Metadata } from 'next'
import { signIn } from 'next-auth/react'
import { useForm, Controller } from 'react-hook-form'
import React from 'react'
import { useRouter } from 'next/navigation'

// export const metadata: Metadata = {
//   title: 'Sign In',
// }

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  // handle credentials error
  const [credentialsError, setCredentialsError] = React.useState('')

// const handleSubmit = async (event: any) => {
  //   event.preventDefault()
  //   const target = event.target as typeof event.target & {
  //     email: { value: string }
  //     password: { value: string }
  //   }
  //   const email = target.email.value
  //   const password = target.password.value
  //   await signIn('credentials', {
  //     email,
  //     password,
  //     redirect: true,
  //     callbackUrl: '/',
  //   })
  // }
  const onSubmit = async (data: any) => {
    const { email, password } = data
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        console.error(result.error)
        if (result.error === 'CredentialsSignin') {
          setCredentialsError('Invalid credentials')
        }
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // console.log(session?.user)

  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{' '}
          for a free trial.
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <TextField {...field} label="Email address" type="email" />
            )}
          />
          {errors.email && (
            <p className="mt-2 text-red-500">
              {errors.email?.message?.toString()}
            </p>
          )}

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                className="mt-6"
              />
            )}
          />
          {errors.password && (
            <p className="mt-2 text-red-500">
              {errors.password?.message?.toString() || ''}
            </p>
          )}

          {/* Show error message if credentials are invalid */}
          {credentialsError && (
            <p className="mt-4 text-red-500 text-center">{credentialsError}</p>
          )}
        </div>
        <Button type="submit" className="mt-6 w-full bg-primary">
          Sign in to account
        </Button>
      </form>
    </AuthLayout>
  )
}
