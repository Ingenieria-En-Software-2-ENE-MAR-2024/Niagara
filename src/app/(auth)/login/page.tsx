"use client";

import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { type Metadata } from 'next'
import { signIn, useSession } from 'next-auth/react'

// export const metadata: Metadata = {
//   title: 'Sign In',
// }

export default function Login() {

  const { data: session } = useSession()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const result = await signIn('credentials', {
      redirect: true,
      email: event.target.email.value,
      password: event.target.password.value,
      callbackUrl: "/",
    })  
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <Button
          type="submit"
          className="mt-8 w-full bg-primary"
        >
          Sign in to account
        </Button>
      </form>
    </AuthLayout>
  )
}
