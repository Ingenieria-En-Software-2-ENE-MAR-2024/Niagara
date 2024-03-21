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

type EdLevel = 'Ninguna educación' | 'Pregrado' | 'Postgrado'

interface user {
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

interface ModalUserProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: user
}

export const FormEditProfile: React.FC<ModalUserProps> = ({
  open,
  setOpen,
  data,
}) => {
  const [token, setToken] = useState<any>(null)
  const [userId, setUserId] = useState<any>(null)
  const [name, setName] = useState('')
  const [ci, setCi] = useState('')

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
		setCi(result?.user?.ci ?? '') 
		setName(result?.user?.name ?? '')
	})
}, [])

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">{'Edición de Perfil'}</DialogTitle>

        <DialogContent>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <TextField
                value={ci}
                label="Cédula de Identidad"
                disabled
                className="mt-6"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={name}
                label="Nombre y Apellido"
                disabled
                className="mt-6"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
