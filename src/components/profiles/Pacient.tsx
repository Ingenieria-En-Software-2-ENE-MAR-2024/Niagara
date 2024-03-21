import React from 'react'
import { TextField } from '@/components/Fields'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { Typography } from '@mui/material'

type PacientProps = {
  user: {
    name: string
    ci: string;
    email: string
  }
}

export const PacientProfile: React.FC<PacientProps> = ({ user }) => {
  return (
    <AuthLayout title="Perfil de Paciente" subtitle={`¡Hola ${user.name}!`}>
      <div>
        <Typography
          variant="body1"
          component="h1"
          style={{ fontWeight: 'bold' }}
        >
          Nombre:
        </Typography>
        <Typography
          variant="body2"
          component="h2"
          style={{
            marginLeft: '30px',
            marginBottom: '32px',
            fontStyle: 'italic',
          }}
          gutterBottom
        >
          {user.name}
        </Typography>
        <Typography
          variant="body1"
          component="h1"
          style={{ fontWeight: 'bold' }}
        >
          Cédula de Identidad:
        </Typography>
        <Typography
          variant="body2"
          component="h2"
          style={{
            marginLeft: '20px',
            marginBottom: '32px',
            fontStyle: 'italic',
          }}
          gutterBottom
        >
          {user.ci}
        </Typography>
        <Typography
          variant="body1"
          component="h1"
          style={{ fontWeight: 'bold' }}
        >
          Correo electrónico:
        </Typography>
        <Typography
          variant="body2"
          component="h2"
          style={{
            marginLeft: '20px',
            marginBottom: '32px',
            fontStyle: 'italic',
          }}
          gutterBottom
        >
          {user.email}
        </Typography>
      </div>
    </AuthLayout>
  )
}
