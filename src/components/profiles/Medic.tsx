import React from 'react'
import { useState } from 'react'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import EditIcon from '@mui/icons-material/Edit'
import { CirclesBackground } from '@/components/CirclesBackground'
import { FormEditProfile } from '@/components/profiles/FormEditProfile'

type EdLevel = 'Ninguna educación' | 'Pregrado' | 'Postgrado'

type MedicProps = {
  user: {
    name: string
    ci: string
    email: string
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

export const MedicProfile: React.FC<MedicProps> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<any>(null)

  const handleModal = (data: MedicProps) => {
    setDataModal(data)
    setOpen(true)
  }

  const handleEditProfile = (data: MedicProps) => {
    handleModal(data)
  }

  return (
    <>
      <main className="flex min-h-full overflow-hidden bg-cover bg-center bg-no-repeat pt-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col px-4">
				{open && (
          <FormEditProfile
            open={open}
            setOpen={setOpen}
            data={dataModal}
          />
        )}
          <div className="flex justify-end">
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              style={{
                minWidth: 'auto',
                backgroundColor: '#1e1b4b',
                borderRadius: '5px',
              }}
              onClick={() => handleEditProfile({ user })}
            >
              Editar perfil
            </Button>
          </div>
          <div className="relative mt-12 flex flex-wrap justify-between sm:mt-4">
            <CirclesBackground
              width="1090"
              height="1090"
              className="absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto"
            />
            <Card
              variant="outlined"
              style={{ marginTop: '20px', flex: '0 0 48%' }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Información Personal
                </Typography>
                <div style={{ display: 'flex' }}>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    Nombre:
                  </Typography>
                  <Typography variant="body2" style={{ marginLeft: '4px' }}>
                    {user.name}
                  </Typography>
                </div>
                <div style={{ display: 'flex' }}>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    Cédula de Identidad:
                  </Typography>
                  <Typography variant="body2" style={{ marginLeft: '4px' }}>
                    {user.ci}
                  </Typography>
                </div>
                <div style={{ display: 'flex' }}>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    Correo electrónico:
                  </Typography>
                  <Typography variant="body2" style={{ marginLeft: '4px' }}>
                    {user.email}
                  </Typography>
                </div>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              style={{ marginTop: '20px', flex: '0 0 48%' }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Visión
                </Typography>
                <Typography variant="body2">
                  {user.vision || 'No proporcionado'}
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              style={{ marginTop: '20px', flex: '0 0 48%' }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Habilidades
                </Typography>
                <Typography variant="body2">
                  {user.skills?.join(', ') || 'No proporcionado'}
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              style={{ marginTop: '20px', flex: '0 0 48%' }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Formación Profesional
                </Typography>
                <Typography variant="body2">
                  {user.ed_lvl || 'No proporcionado'}
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              style={{ marginTop: '20px', flex: '0 0 48%' }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Experiencia Profesional
                </Typography>
                <Typography variant="body2">
                  {user.prof_formation?.join(', ') || 'No proporcionado'}
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              style={{ marginTop: '20px', flex: '0 0 48%' }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Cursos y Eventos
                </Typography>
                <Typography variant="body2">
                  {user.events?.join(', ') || 'No proporcionado'}
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              style={{ marginTop: '20px', flex: '0 0 48%' }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Presentaciones
                </Typography>
                <Typography variant="body2">
                  {user.presentations?.join(', ') || 'No proporcionado'}
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              style={{ marginTop: '20px', flex: '0 0 48%' }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Publicaciones
                </Typography>
                <Typography variant="body2">
                  {user.publications?.join(', ') || 'No proporcionado'}
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              style={{
                marginTop: '20px',
                flex: '0 0 48%',
                marginBottom: '50px',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Becas y Reconocimientos
                </Typography>
                <Typography variant="body2">
                  {user.grants?.join(', ') || 'No proporcionado'}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
