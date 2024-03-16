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

interface AppointmentData {
  id: number
  start_date: string
  start_hour: string
  id_patient: string
  name_patient: string
  speciality: string
  doctor: string
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
  console.log(data)
  
  const [date, setDate] = useState(data.start_date)
  const [time, setTime] = useState(data.start_hour)
  const [description, setDescription] = useState(data.description)
  const [changeReason, setChangeReason] = useState('')
  console.log(date);

  const handleSubmitDialog = async () => {
    if (time === '' || description === '') {
      console.log('Faltaron datos.')
      return
    }

    try {
      console.log(data);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/${data.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data }),
        },
      )

      if (!response.ok) {
        // console.log(response)
        console.log('Appointment could not be edited')
        return
      }
      console.log('Appointment edited')
      if (onChangedUsers != undefined) onChangedUsers()
    } catch (e) {
      console.log('An error ocurred editing the appointment')
      return
    } finally {
      setOpen(false)
    }
  }

  const generateTimeOptions = () => {
    const options = []
    for (let hour = 8; hour <= 17; hour++) {
      const timeString = `${hour}:00`
      options.push(
        <option key={timeString} value={timeString}>
          {timeString}
        </option>,
      )
    }
    return options
  }

  const formatDate = (date: Date): string => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const formattedDay = day < 10 ? '0' + day : day
    const formattedMonth = month < 10 ? '0' + month : month
    console.log(day)
    console.log(month)
    console.log(year)

    return `${formattedDay}/${formattedMonth}/${year}`
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    // Incrementar la fecha seleccionada en un día
    selectedDate.setDate(selectedDate.getDate() + 1);
    setDate(formatDate(selectedDate));
  };

  const formatDateToYMD = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setDate(data.start_date)
    setTime(data.start_hour)
    setDescription(data.description)
  }, [data])

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
          {'Editción de la cita médica'}
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
                value={data.doctor}
                label="Médico o Especialista"
                disabled
                className="mt-6"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={formatDateToYMD(date)}
                onChange={handleDateChange}
                label="Fecha (dd/mm/yy)"
                type="date"
                className="mt-6"
              />
            </Grid>

            <Grid item xs={12}>
              <SelectField
                value={time}
                onChange={(e) => setTime(e.target.value)}
                label="Hora"
                className="mt-6"
              >
                {generateTimeOptions()}
              </SelectField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
