'use cliente'
import React, { useEffect, useMemo, useState } from 'react'
import { Container } from '../Container'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { useForm, Controller } from 'react-hook-form'
import rules from '@/helpers/formRules/medicalAppointment.rules'
import { getSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { add } from 'date-fns'

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
    watch,
  } = useForm<appointmentData>()

  const router = useRouter()

  const medicalArea = watch('medicalArea')

  const [idPatient, setIdPatient] = useState<any>(null)
  const [token, setToken] = useState<any>(null)
  const [doctors, setDoctors] = useState<any>([])

  const visibleDoctors = useMemo(() => {
    return doctors.filter((doctor: any) => doctor.speciality === medicalArea)
  }, [medicalArea, doctors])

  const onSubmit = async (data: appointmentData) => {
    const { date, description, doctor, time } = data

    const [year, month, day] = date.split('-')

    const startDate = new Date(`${year}/${month}/${day} ${time}:00`)
    const endDate = add(startDate, { hours: 1 })

    const dataSend = {
      medic_id: visibleDoctors[0].medic_id,
      patient_id: idPatient,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      description,
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
          body: JSON.stringify(dataSend),
        },
      )

      if (!response.ok) {
        console.log('Appointment could not be saved')
        return
      }
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cita creada exitosamente',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        console.log('Appointment saved')
        router.push('/appointments')
      })
    } catch (e) {
      console.log('An error ocurred saving the appointment')
      return
    }
  }

  useEffect(() => {
    getSession().then((result) => {
      setIdPatient(result?.user?.id)
      setToken(result?.user?.accessToken)
      const fetchUsers = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/medicAll`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${result?.user?.accessToken}`,
              },
            },
          )
          if (!response.ok) {
            const errorText = await response.text()
            console.log('an error ocurred fetching the users')
            console.log(errorText)
            return
          }
          // logica
          const medicAll = await response.json()
          setDoctors(medicAll)
          console.log(medicAll)
        } catch (e) {
          return
        }
      }
      fetchUsers()
    })
  }, [])

  console.log(visibleDoctors)

  return (
    <Container>
      <h1 className="mb-4 mt-4 text-center text-2xl font-medium tracking-tight text-gray-900">
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
                <SelectField
                  {...field}
                  label="Área o especialidad médica"
                  className=""
                >
                  <option disabled value="">
                    Seleccione un área médica
                  </option>
                  {doctors.map((doctor: any) => {
                    return (
                      <option key={doctor.id} value={doctor.speciality}>
                        {doctor.speciality}
                      </option>
                    )
                  })}
                </SelectField>
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
                <SelectField
                  {...field}
                  label="Médico o especialista"
                  className=""
                >
                  <option disabled value="">
                    Seleccione un doctor{' '}
                  </option>
                  {visibleDoctors.map((doctor: any) => {
                    return (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    )
                  })}
                </SelectField>
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
