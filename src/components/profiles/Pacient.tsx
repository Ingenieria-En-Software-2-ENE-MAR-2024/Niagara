import React, { useState } from 'react'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { FormEditProfile } from '@/components/profiles/FormEditProfile'

enum EdLevel {
  NONE = 'NONE',
  PREG = 'PREG',
  POSTG = 'POSTG',
}

const EdLevelDisplay = {
  [EdLevel.NONE]: 'Ninguna educación',
  [EdLevel.PREG]: 'Pregrado',
  [EdLevel.POSTG]: 'Postgrado',
}


type PacientProps = {
  user: {
    name: string
    ci: string
    email: string
  }
  data: {
    vision?: string
    skills?: string[]
    ed_lvl?: EdLevel
    prof_formation?: string[]
    events?: string[]
    presentations?: string[]
    publications?: string[]
    grants?: string[]
  }
}

export const PacientProfile: React.FC<PacientProps> = ({ user, data }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<any>(null)

  const handleModal = (data: PacientProps) => {
    setDataModal(data)
    setOpen(true)
    window.location.reload()
  }

  const handleEditProfile = (data: PacientProps) => {
    handleModal(data)
  }

  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          marginTop: '50px',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '2.0rem',
          letterSpacing: 'tight',
          color: 'gray.900',
        }}
      >
        ¡Hola {user.name}!
      </h1>
      {open && (
        <FormEditProfile open={open} setOpen={setOpen} data={dataModal} />
      )}
      <div className="flex justify-end">
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          style={{
            minWidth: 'auto',
            backgroundColor: '#1e1b4b',
            borderRadius: '5px',
            marginBottom: '0%',
          }}
          onClick={() => handleEditProfile({ user, data })}
        >
          Editar perfil
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: '0%',
        }}
      >
        <AuthLayout title="" subtitle="Información Personal">
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
        <AuthLayout title="" subtitle="Información Profesional">
          <Typography
            variant="body1"
            component="h1"
            style={{ fontWeight: 'bold' }}
          >
            Visión:
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
            {data.vision || 'No proporcionado'}
          </Typography>
          <Typography
            variant="body1"
            component="h1"
            style={{ fontWeight: 'bold' }}
          >
            Habilidades:
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
            {data.skills?.join(', ') || 'No proporcionado'}
          </Typography>
          <Typography
            variant="body1"
            component="h1"
            style={{ fontWeight: 'bold' }}
          >
            Formación Profesional:
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
            {EdLevelDisplay[data.ed_lvl as keyof typeof EdLevelDisplay] || 'No proporcionado'}
          </Typography>
          <Typography
            variant="body1"
            component="h1"
            style={{ fontWeight: 'bold' }}
          >
            Experiencia Profesional:
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
            {data.prof_formation?.join(', ') || 'No proporcionado'}
          </Typography>
          <Typography
            variant="body1"
            component="h1"
            style={{ fontWeight: 'bold' }}
          >
            Cursos y Eventos:
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
            {data.events?.join(', ') || 'No proporcionado'}
          </Typography>
          <Typography
            variant="body1"
            component="h1"
            style={{ fontWeight: 'bold' }}
          >
            Presentaciones:
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
            {data.presentations?.join(', ') || 'No proporcionado'}
          </Typography>
          <Typography
            variant="body1"
            component="h1"
            style={{ fontWeight: 'bold' }}
          >
            Publicaciones:
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
            {data.publications?.join(', ') || 'No proporcionado'}
          </Typography>
          <Typography
            variant="body1"
            component="h1"
            style={{ fontWeight: 'bold' }}
          >
            Becas y Reconocimientos:
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
            {data.grants?.join(', ') || 'No proporcionado'}
          </Typography>
        </AuthLayout>
      </div>
    </div>
  )
}
