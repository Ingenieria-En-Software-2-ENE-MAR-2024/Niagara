'use client'

import { useState, useEffect } from 'react'
import { Box, IconButton, Tooltip, Grid, Typography } from '@mui/material'
import {
  Appointment,
  MedicalCalendarTable,
} from '../../components/medicalCalendarTable/MedicalCalendarTable'
import { Edit, Delete } from '@mui/icons-material'
import AppointmentFilter from '../../components/medicalCalendarTable/AppointmentFilter'
import Swal from 'sweetalert2'
import { HeaderNiagara } from '@/components/HeaderNiagara'
import { useRouter } from 'next/router'
import { FormEditAppointment } from '@/components/FormEditAppointment'

const createData = (
  date: string,
  time: string,
  id: string,
  fullName: string,
  specialty: string,
  actions: any,
): Appointment => {
  return { date, time, id, fullName, specialty, actions }
}

const columns: string[] = [
  'Fecha',
  'Hora',
  'ID Paciente',
  'Nombre y Apellido',
  'Área o Especialidad',
  'Acciones',
]
const columnsToFilter: string[] = [columns[2], columns[3], columns[4]]

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export default function AppointmentTablePage() {
  const [open, setOpen] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<any>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredRows, setFilteredRows] = useState<Appointment[]>(appointments)

  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(5)

  const handleModal = (appointment: Appointment) => {
    setDataModal(appointment)
    setOpen(true)
  }

  useEffect(() => {
    const fetchAppointments = async (page: number, pageSize: number) => {
      try {
        const response = await fetch(`${baseUrl}/api/appointments/medic`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: null,
        })
        if (!response.ok) {
          const errorText = await response.text()
          console.log('an error ocurred fetching the appointments')
          console.log(errorText)
          return
        }

        const startIndex = page * pageSize
        const endIndex = startIndex + pageSize
        const allAppoint = await response.json()
        const appointmentsSliced = allAppoint.slice(startIndex, endIndex)
        const appointmentList = appointmentsSliced.map(
          (appointment: Appointment) => {
            return createData(
              appointment.date,
              appointment.time,
              appointment.id,
              appointment.fullName,
              appointment.specialty,
              createActionsComponent({ appointment }), // Remove the empty string argument
            )
          },
        )
        setAppointments(appointmentList)
        setFilteredRows(appointmentList)
      } catch (e) {
        return
      }
    }

    const createActionsComponent: React.FC<{ appointment: Appointment }> = ({
      appointment,
    }) => {
      return (
        <Grid container justifyContent="flex-start" columns={4} spacing={1.5}>
          <Grid item xs={1} justifyContent="left">
            <Tooltip title="Editar cita" arrow>
              <IconButton
                color="primary"
                className="text-tertiary"
                onClick={() => handleEditAppointment(appointment.id)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={0} justifyContent="left">
            <Tooltip title="Borrar cita" arrow>
              <IconButton
                color="primary"
                className="text-tertiary"
                onClick={() => handleRemoveAppointment(appointment.id)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      )
    }

    const handleEditAppointment = (appointmentId: String) => {
      const appointment = appointments.find(
        (appointment) => appointment.id === appointmentId,
      )
      if (appointment) {
        handleModal(appointment)
      }
    }

    const handleRemoveAppointment = async (id: string) => {
      const result = await Swal.fire({
        title: '¿Estás seguro de eliminar la cita?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
      })

      if (result.isConfirmed) {
        try {
          const response = await fetch(`${baseUrl}/api/appointments/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: null,
          })

          if (!response.ok) {
            console.log('La cita no pudo ser eliminada')
            return
          }

          console.log('Cita eliminada')
        } catch (e) {
          console.log('Ocurrió un error al eliminar la cita')
          return
        }
        Swal.fire('¡Eliminado!', 'La cita ha sido eliminada.', 'success')
      }
    }

    fetchAppointments(page, pageSize)
  }, [page, pageSize, appointments])

  return (
    <>
      <HeaderNiagara />
      {open && (
        <FormEditAppointment
          open={open}
          setOpen={setOpen}
          data={dataModal}
          onChangedUsers={async () => setPageSize(pageSize + 1)}
        />
      )}
      <Box className="box-content">
        <Box sx={{ p: 4 }} className="pt-24">
          <AppointmentFilter
            columns={columnsToFilter}
            rows={appointments}
            setFilteredRows={setFilteredRows}
          />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            paddingRight="1px"
          >
            <Box className="mb-4 w-full rounded-md bg-primary p-2">
              <Typography
                variant="h5"
                className="welcome-text text-center text-white"
              >
                Calendario Médico
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12}>
            <MedicalCalendarTable
              filteredRows={filteredRows}
              columns={columns}
              onPageChange={setPage}
              onSizeChange={setPageSize}
              appointments={appointments}
            />
          </Grid>
        </Box>
      </Box>
    </>
  )
}
