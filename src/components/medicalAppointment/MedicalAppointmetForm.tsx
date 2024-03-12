'use cliente'
import React, { useEffect, useState } from 'react'
import { Container } from '../Container'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { useForm, Controller } from 'react-hook-form'
import rules from '@/helpers/formRules/medicalAppointment.rules'
import { getSession } from 'next-auth/react'

interface appointmentData {
  name: string
  lastName: string
  patientId: string
  description: string
  medicalArea: string
  doctor: string
  date: string
  time: string
}

function MedicalAppointmetForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<appointmentData>()

  const [idPatient, setIdPatient] = useState<any>(null)
  const [token, setToken] = useState<any>(null)

  //   handleSubmit
  const onSubmit = async (data: appointmentData) => {
    const {
      name,
      lastName,
      date,
      description,
      doctor,
      medicalArea,
      patientId,
      time,
    } = data

    const dataSend = {
      start_hour: time,
      end_hour: time,
      start_date: date,
      end_date: date,
      id_medic: 3,
      id_patient: idPatient,
      description: 'Esta es una descripcin',
    }

    console.log(dataSend)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'access-token': `Bearer ${token}`,
          },
          body: JSON.stringify( dataSend ),
        },
      )

      if (!response.ok) {
        // console.log(response)
        console.log('Appointment could not be saved')
        return
      }
      console.log('Appointment saved')
    } catch (e) {
      console.log('An error ocurred saving the appointment')
      return
    }
  }

  useEffect(() => {
    getSession().then((result) => {
      setIdPatient(result?.user?.id)
      setToken(result?.user?.accessToken)
    })
  }, [])

  return (
    <Container>
      <h1 className="mb-4 text-center text-2xl font-medium tracking-tight text-gray-900">
        Agendar cita médica{' '}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4 text-xl font-medium tracking-tight text-gray-900">
          Datos del paciente
        </h2>

        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={rules.name}
              render={({ field }) => (
                <TextField {...field} label="Nombre" type="text" className="" />
              )}
            />

            {errors.name && (
              <p className="col-span-full mt-2 text-sm text-red-500">
                {errors.name?.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={rules.lastName}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apellido"
                  type="text"
                  className=""
                />
              )}
            />
            {errors.lastName && (
              <p className="col-span-full mt-2 text-sm text-red-500">
                {errors.lastName?.message?.toString()}
              </p>
            )}
          </div>

          <div className="col-span-full lg:col-span-1">
            <Controller
              name="patientId"
              control={control}
              defaultValue=""
              rules={rules.patientId}
              render={({ field }) => (
                <TextField {...field} label="Cédula de identidad" type="text" />
              )}
            />
            {errors.patientId && (
              <p className="col-span-full mt-2 text-sm text-red-500">
                {errors.patientId?.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <hr className="my-4 h-0.5 bg-gray-200" />

        <h2 className="mb-4 text-xl font-medium tracking-tight text-gray-900">
          Detalles de la cita
        </h2>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="col-span-full">
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={rules.description}
              render={({ field }) => (
                <TextField {...field} label="Descripción" type="text" />
              )}
            />
            {errors.description && (
              <p className="col-span-full mt-2 text-sm text-red-500">
                {errors.description?.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <Controller
              name="medicalArea"
              control={control}
              defaultValue=""
              rules={rules.medicalArea}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Area o especialidad médica"
                  type="text"
                  className=""
                />
              )}
            />
            {errors.medicalArea && (
              <p className="col-span-full mt-2 text-sm text-red-500">
                {errors.medicalArea?.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <Controller
              name="doctor"
              control={control}
              defaultValue=""
              rules={rules.doctor}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Médico o especialista"
                  type="text"
                  className=""
                />
              )}
            />
            {errors.doctor && (
              <p className="col-span-full mt-2 text-sm text-red-500">
                {errors.doctor?.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <Controller
              name="date"
              control={control}
              defaultValue=""
              rules={rules.date}
              render={({ field }) => (
                <TextField {...field} label="Fecha" type="date" className="" />
              )}
            />
            {errors.date && (
              <p className="col-span-full mt-2 text-sm text-red-500">
                {errors.date?.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <Controller
              name="time"
              control={control}
              defaultValue=""
              rules={rules.time}
              render={({ field }) => (
                <TextField {...field} label="Hora" type="time" className="" />
              )}
            />
            {errors.time && (
              <p className="col-span-full mt-2 text-sm text-red-500">
                {errors.time?.message?.toString()}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="mt-8 w-full bg-primary">
          Confirmar cita
        </Button>
      </form>
    </Container>
  )
}

export default MedicalAppointmetForm
