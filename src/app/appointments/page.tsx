'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Grid,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material'
import {
  Appointment,
  AppointmentTable,
} from '../../components/appointmentTable/AppointmentTable'
import { Edit, Delete } from '@mui/icons-material'
import Swal from 'sweetalert2'

const createData = (
  date: string,
  time: string,
  id: string,
  fullName: string,
  specialty: string,
  doctor: string,
  description: string,
  actions: any,
): Appointment => {
  return { date, time, id, fullName, specialty, doctor, description, actions }
}

const columns: string[] = [
  'Fecha',
  'Hora',
  'ID Paciente',
  'Nombre y Apellido',
  'Área o Especialidad',
  'Médico o Especialista',
  'Descripción',
  'Acciones',
]

export default function AppointmentTablePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredRows, setFilteredRows] = useState<Appointment[]>(appointments)

  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(5)

  useEffect(() => {
    // Datos dummy
    const dummyData: any[] = [
      {
        date: '2022-12-12',
        time: '10:00',
        id: '123',
        fullName: 'Juan Perez',
        specialty: 'Cardiología',
        doctor: 'Dr. Juan Perez',
        description: 'Dolor en el pecho',
      },
      {
        date: '2024-02-26',
        time: '15:00',
        id: '124',
        fullName: 'Maria Rodriguez',
        specialty: 'Oftalmología',
        doctor: 'Dr. Juan Perez',
        description: 'Dolor de cabeza',
      },
      {
        date: '2024-01-26',
        time: '15:00',
        id: '125',
        fullName: 'Pablo Rodriguez',
        specialty: 'Oftalmología',
        doctor: 'Dr. Juan Perez',
        description: 'Dolor de cabeza',
      },
    ]

    const fetchAppointments = async (page: number, pageSize: number) => {
      const startIndex = page * pageSize
      const endIndex = startIndex + pageSize
      const appointmentsSliced = dummyData.slice(startIndex, endIndex)
      const appointmentList = appointmentsSliced.map(
        (appointment: Appointment) => {
          return createData(
            appointment.date,
            appointment.time,
            appointment.id,
            appointment.fullName,
            appointment.specialty,
            appointment.doctor,
            appointment.description,
            createActionsComponent({ appointment }), // Remove the empty string argument
          )
        },
      )
      setAppointments(appointmentList)
      setFilteredRows(appointmentList)
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
                // onClick={() => editAppointment(appointment)}
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

    const handleRemoveAppointment = (id: string) => {
      Swal.fire({
        title: '¿Estás seguro de eliminar la cita?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('¡Eliminado!', 'La cita ha sido eliminada.', 'success')
        }
      })
    }

    fetchAppointments(page, pageSize)
  }, [page, pageSize])

  return (
    <>
      <Box className="box-content">
        <AppBar
          position="fixed"
          style={{ justifyItems: 'center', alignItems: 'center' }}
          className="bg-tertiary"
        >
          <Toolbar className="navbar">
            <Typography
              variant="h5"
              component="div"
              className="font-bold"
              sx={{ flexGrow: 1 }}
            >
              {`Gestión de Citas Médicas`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 4 }} className="pt-24">
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
                Detalle de las Citas Médicas
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12}>
            <AppointmentTable
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
