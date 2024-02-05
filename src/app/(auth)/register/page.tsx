'use client'

import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { useRouter } from 'next/navigation'
import { env } from 'process'
// import { type Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Sign Up',
// }

export default function Register() {
  const router = useRouter()

  // handle submit
  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      name: { value: string }
      email: { value: string }
      password: { value: string }
      role: { value: string }
    }

    const name = target.name.value
    const email = target.email.value
    const password = target.password.value
    const role = target.role.value

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
      console.error('Fallo en la creación de usuario')
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
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            className="col-span-full"
            label="Nombre"
            name="name"
            type="text"
            autoComplete="given-name"
            required
          />
          <TextField
            className="col-span-full"
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          <SelectField
            className="col-span-full"
            label="Tipo de usuario"
            name="role"
          >
            <option>Admin</option>
            <option>Paciente</option>
            <option>Doctor</option>
          </SelectField>
        </div>
        <Button type="submit" className="mt-8 w-full bg-primary">
          Regístrate
        </Button>
      </form>
    </AuthLayout>
  )
}
