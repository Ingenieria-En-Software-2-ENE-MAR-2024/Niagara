'use client'

import React, { useEffect, useState } from 'react'
import { TextField, SelectField } from '@/components/Fields'
import { Button } from '@/components/Button'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material'
import { getSession } from 'next-auth/react'
import { SelectChangeEvent } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

interface data {
  user: {
    name: string
    ci: string
    email: string
  }
  data: {
    vision?: string
    skills?: string[]
    ed_lvl?: string
    prof_formation?: string[]
    events?: string[]
    presentations?: string[]
    publications?: string[]
    grants?: string[]
  }
}

interface ModalUserProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: data
}

export const FormEditProfile: React.FC<ModalUserProps> = ({
  open,
  setOpen,
  data,
}) => {
  const [token, setToken] = useState<any>(null)
  const [userId, setUserId] = useState<any>(null)
  const [formData, setFormData] = useState(data)

  const { control } = useForm<data>()

  //   const handleSubmitDialog = async () => {
  //     try {

  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${String(userId)}`,
  //         {
  //           method: 'PUT',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'access-token': `Bearer ${token}`,
  //           },
  //           body: JSON.stringify({

  //           }),
  //         },
  //       )

  //       if (!response.ok) {
  //         // console.log(response)
  //         console.log('Appointment could not be edited')
  //         return
  //       }

  //     } catch (e) {
  //       console.log('An error ocurred editing the appointment')
  //       return
  //     } finally {
  //       setOpen(false)
  //     }
  //   }

  useEffect(() => {
    getSession().then((result) => {
      setToken(result?.user?.accessToken)
      setUserId(result?.user?.id)
    })
  }, [])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault() // Previene la recarga de la página

    // Se manejan los datos del formulario
    console.log(formData)

    // Cierra el modal
    setOpen(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Actualiza los datos del formulario
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    // Actualiza los datos del formulario
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  console.log(data)

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md" // Cambia a 'md' para una ventana de diálogo más grande
      >
        <DialogTitle id="alert-dialog-title">{'Edición de Perfil'}</DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  value={formData.user.name}
                  onChange={handleChange}
                  name="name"
                  label="Nombre y Apellido"
                  className="mt-6"
                />
                <TextField
                  value={data.user.ci}
                  onChange={handleChange}
                  name="ci"
                  label="Cédula de Identidad"
                  className="mt-6"
                />
                <TextField
                  value={data.user.email}
                  onChange={handleChange}
                  name="email"
                  label="Correo Electrónico"
                  className="mt-6"
                />
                <TextField
                  value={data.data.vision}
                  onChange={handleChange}
                  name="vision"
                  label="Visión"
                  className="mt-6"
                />
                <TextField
                  value={data.data.skills}
                  onChange={handleChange}
                  name="skills"
                  label="Habilidades"
                  className="mt-6"
                />
                <Controller
                  name="data.ed_lvl"
                  control={control}
                  defaultValue={data.data.ed_lvl}
                  render={({ field }) => (
                    <SelectField
                      {...field}
                      className="col-span-full mt-6"
                      label="Formación Profesional"
                    >
                      <option value="NONE">Ninguna educación</option>
                      <option value="PREG">Pregrado</option>
                      <option value="POSTG">Postgrado</option>
                    </SelectField>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={data.data.prof_formation}
                  onChange={handleChange}
                  name="prof_formation"
                  label="Experiencia Profesional"
                  className="mt-6"
                />
                <TextField
                  value={data.data.events}
                  onChange={handleChange}
                  name="events"
                  label="Cursos y Eventos"
                  className="mt-6"
                />
                <TextField
                  value={data.data.presentations}
                  onChange={handleChange}
                  name="presentations"
                  label="Presentaciones"
                  className="mt-6"
                />
                <TextField
                  value={data.data.publications}
                  onChange={handleChange}
                  name="publications"
                  label="Publicaciones"
                  className="mt-6"
                />
                <TextField
                  value={data.data.grants}
                  onChange={handleChange}
                  name="grants"
                  label="Becas y Reconocimientos"
                  className="mt-6"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
