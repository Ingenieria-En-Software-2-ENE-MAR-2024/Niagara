'use client'

import React, { useEffect, useState,ChangeEvent } from 'react'
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
import { useForm, Controller } from 'react-hook-form'


enum EdLevelDisplay {
  NONE = 'Ninguna educación',
  PREG = 'Pregrado',
  POSTG = 'Postgrado',
}
interface data {
  
  vision?: ''
  skills?: []
  ed_lvl?: EdLevelDisplay
  prof_formation?: []
  events?: []
  presentations?: []
  publications?: []
  grants?: []

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
  const [token, setToken] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const { control, watch } = useForm<data>()
  const formData = watch()
  

  console.log(formData)
  console.log('!!!!!!!!!!!!!!!!!!!')

  const handleSubmitDialog = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'access-token': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      )

      if (!response.ok) {
        console.error('Error:', response.status, response.statusText)
        return
      }
    } catch (e) {
      console.error('Error:', e)
      return
    } finally {
      setOpen(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleSubmitDialog()
    console.log('Formulario enviado')
    console.log(formData)
    setOpen(false)
  }

  
  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    field.onChange(event.target.value);
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>, field: any) => {
    field.onChange(event.target.value);
  }
  
  const handleArrayChange = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const { value } = event.target;
    const arrayValue = value.split(',').map(item => item.trim());
    field.onChange(arrayValue);
  }
  

  useEffect(() => {
    getSession().then((result) => {
      setToken(result?.user.accessToken ?? null)
      setUserId(result?.user.id.toString() ?? null)
      
    })
  }, [data]) 

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
                <Controller 
                  name='vision'
                  control={control}
                  defaultValue={data.vision}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Visión"
                      className="mt-6"
                      onChange={(e) => handleDataChange(e, field)}
                    />
                  )}
                />
                <Controller 
                  name='skills'
                  control={control}
                  defaultValue={data.skills}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Habilidades"
                      className="mt-6"
                      onChange={(e) => handleArrayChange(e, field)}
                    />
                  )}
                />
                <Controller
                  name='ed_lvl'
                  control={control}
                  defaultValue={data.ed_lvl}
                  render={({ field }) => (
                    <SelectField
                      {...field}
                      className="col-span-full mt-6"
                      label="Formación Profesional"
                      onChange={(e) => handleSelectChange(e, field)}
                    >
                      {Object.entries(EdLevelDisplay).map(([value, display]) => (
                        <option key={value} value={value}>{display}</option>
                      ))}
                    </SelectField>
                  )}
                />
                <Controller
                  name='prof_formation'
                  control={control}
                  defaultValue={data.prof_formation}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Experiencia Profesional"
                      className="mt-6"
                      onChange={(e) => handleArrayChange(e, field)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name='events'
                  control={control}
                  defaultValue={data.events}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Eventos"
                      className="mt-6"
                      onChange={(e) => handleArrayChange(e, field)}
                    />
                  )}
                />
                <Controller
                  name='presentations'
                  control={control}
                  defaultValue={data.presentations}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Presentaciones"
                      className="mt-6"
                      onChange={(e) => handleArrayChange(e, field)}
                    />
                  )}
                />
                <Controller
                  name='publications'
                  control={control}
                  defaultValue={data.publications}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Publicaciones"
                      className="mt-6"
                      onChange={(e) => handleArrayChange(e, field)}
                    />
                  )}
                />
                <Controller
                  name='grants'
                  control={control}
                  defaultValue={data.grants}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Becas"
                      className="mt-6"
                      onChange={(e) => handleArrayChange(e, field)}
                    />
                  )}
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
