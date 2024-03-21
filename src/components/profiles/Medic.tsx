import React from 'react'
import { TextField } from '@/components/Fields'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { Typography } from '@mui/material'

type MedicProps = {
  user: {
    name: string
    username: string
    //id: string;
    email: string
  }
}

export const MedicProfile: React.FC<MedicProps> = ({ user }) => {
  return (
    <AuthLayout title="Perfil de Doctor" subtitle={`¡Hola ${user.name}!`}>
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
          Usuario:
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
          {user.username}
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
          12.345.678
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
