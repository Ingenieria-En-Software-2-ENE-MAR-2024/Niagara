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
import Swal from 'sweetalert2'

interface AppointmentData {
  id: number
  start_date: string
  start_hour: string
  id_patient: string
  id_medic: string
  name_patient: string
  speciality: string
  name_medic: string
  description: string
}

interface ModalUserProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: AppointmentData
  onChangedUsers: any
}

export const FormEditAppointment: React.FC<ModalUserProps> = ({
  open,
  setOpen,
  data,
  onChangedUsers = undefined,
}) => {
  const [dataInit, setDataInit] = useState(data)
  const [date, time] = data.start_date.split(' ')

  useEffect(() => {
    const [hour, minute, second] = data.start_date.split(' ')[1].split(':')
    const formattedTime = `${hour}:${minute} ${
      parseInt(hour) >= 12 ? 'PM' : 'AM'
    }`
    const timeIn24HourFormat = convertTo24Hour(formattedTime)

    setTimeEdited(timeIn24HourFormat)
  }, [data.start_date])

  const [timeEdited, setTimeEdited] = useState<string | undefined>(undefined)

  const [dateEdited, setDateEdited] = useState(date)
  const [description, setDescription] = useState(data.description)
  const [changeReason, setChangeReason] = useState('')
  const [token, setToken] = useState<any>(null)

  const handleSubmitDialog = async () => {
    if (time === '' || description === '') {
      Swal.fire(
        '¡Error!',
        'Por favor, complete todos los campos para continuar.',
        'error',
      )
      return
    }
    try {
      const [day, month, year] = dateEdited.split('/')
      const newDay = parseInt(day, 10).toString().padStart(2, '0')
      const dateSend = `${year}/${month}/${newDay} ${timeEdited}`

      if (isNaN(new Date(dateSend).getTime())) {
        Swal.fire('¡Error!', 'La fecha y la hora son obligatorias.', 'error')
        return
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/${data.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'access-token': `Bearer ${token}`,
          },
          body: JSON.stringify({
            patient_id: data.id_patient,
            medic_id: data.id_medic,
            start_date: dateSend,
            end_date: dateSend,
            description: description,
          }),
        },
      )

      if (!response.ok) {
        console.log('Appointment could not be edited')
        return
      }
      Swal.fire(
        '¡Cambio realizado con éxito!',
        'La cita ha sido editada.',
        'success',
      )
      console.log('Appointment edited')
      if (onChangedUsers != undefined) onChangedUsers()
    } catch (e) {
      console.log('An error ocurred editing the appointment')
      return
    } finally {
      setOpen(false)
    }
  }

  function convertTo24Hour(time: any) {
    var [hours, minutes] = time.split(':')
    var [minutes, meridiem] = minutes.split(' ')

    if (meridiem.toLowerCase() === 'pm' && hours < 12) {
      hours = parseInt(hours) + 12
    } else if (meridiem.toLowerCase() === 'am' && hours === '12') {
      hours = '00'
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}`
  }

  const formatDate = (date: Date): string => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const formattedDay = day < 10 ? '0' + day : day
    const formattedMonth = month < 10 ? '0' + month : month
    return `${formattedDay}/${formattedMonth}/${year}`
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value)
    // Incrementar la fecha seleccionada en un día
    selectedDate.setDate(selectedDate.getDate() + 1)
    setDateEdited(formatDate(selectedDate))
  }

  const formatDateToYMD = (dateString: string) => {
    const [day, month, year] = dateString.split('/')
    const formattedDay = day.padStart(2, '0')
    const formattedMonth = month.padStart(2, '0')
    return `${year}-${formattedMonth}-${formattedDay}`
  }

  useEffect(() => {
    getSession().then((result) => {
      setToken(result?.user?.accessToken)
    })
  }, [])

  const handleTimeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setTimeEdited(e.target.value as string)

    // Actualiza data.start_date con la nueva fecha y hora
    const newDate = `${dateEdited} ${e.target.value}`
    setDataInit((prevData) => ({ ...prevData, start_date: newDate }))
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setDescription(e.target.value as string)
  }

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
        <DialogTitle id="alert-dialog-title">
          {'Edición de la cita médica'}
        </DialogTitle>

        <DialogContent>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <TextField
                value={data.id_patient}
                label="ID Paciente"
                disabled
                className="mt-6"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={data.name_patient}
                label="Nombre y Apellido"
                disabled
                className="mt-6"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={data.speciality}
                label="Área o Especialidad"
                disabled
                className="mt-6"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={data.name_medic}
                label="Médico o Especialista"
                disabled
                className="mt-6"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={formatDateToYMD(dateEdited)}
                onChange={handleDateChange}
                label="Fecha (dd/mm/yy)"
                type="date"
                className="mt-6"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={timeEdited}
                onChange={handleTimeChange}
                label="Hora"
                type="time"
                className="mt-6"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={description}
                onChange={handleDescriptionChange}
                label="Descripción"
                className="mt-6"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                label="Razón de cambio"
                className="mt-6"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmitDialog} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
