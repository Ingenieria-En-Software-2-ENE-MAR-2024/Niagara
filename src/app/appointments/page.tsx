'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Box,
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
import { Edit, Delete, ApiOutlined } from '@mui/icons-material'
import AppointmentFilter from '../../components/appointmentTable/AppointmentFilter'
import Swal from 'sweetalert2'
import { FormEditAppointment } from '@/components/FormEditAppointment'
import Menu  from '@/components/Menu'
import { getSession } from 'next-auth/react'

const createData = (
  id: number,
  end_date: string,
  start_hour: string,
  id_patient: string,
  name_patient: string,
  speciality: string,
  doctor: string,
  description: string,
  actions: any,
): Appointment => {
  return {
    id,
    end_date,
    start_hour,
    id_patient,
    name_patient,
    speciality,
    doctor,
    description,
    actions,
  }
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

const columnsToFilter: string[] = [columns[3], columns[4], columns[5]]

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
        // Get the session
        const session = await getSession()

        const response = await fetch(`${baseUrl}/api/appointments/patient`, {
          method: 'GET',
          headers: {
            'access-token': `Bearer ${session?.user.accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          const errorText = await response.text()
          console.log('an error ocurred fetching the appointments')
          throw new Error(errorText)
        }

        const allAppointments = await response.json()
        console.log(allAppointments)

        const startIndex = page * pageSize
        const endIndex = startIndex + pageSize
        const appointmentsSliced = allAppointments.slice(startIndex, endIndex)
        const appointmentList = appointmentsSliced.map(
          (appointment: Appointment) => {
            return createData(
              appointment.id,
              appointment.end_date,
              appointment.start_hour,
              appointment.id_patient,
              appointment.name_patient,
              appointment.speciality,
              appointment.doctor,
              appointment.description,
              createActionsComponent({ appointment }), // Remove the empty string argument
            )
          },
        )
        setAppointments(allAppointments)
        setFilteredRows(appointmentList)
      } catch (e) {
        console.log(e)
      }
    }

    const handleEditAppointment = (
      appoint: Appointment,
      appointmentId: number,
    ) => {
      handleModal(appoint)
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
                onClick={() =>
                  handleEditAppointment(appointment, appointment.id)
                }
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

    const handleRemoveAppointment = async (id: number) => {
      try {
        // Get the session
        const session = await getSession()

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/${id}`,
          {
            method: 'DELETE',
            headers: {
              'access-token': `Bearer ${session?.user.accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )

        if (!response.ok) {
          console.log('an error ocurred deleting the appointment')
          return
        }

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
            fetchAppointments(page, pageSize)
          }
        })
      } catch (e) {
        console.log(e)
      }
    }

    fetchAppointments(page, pageSize)
  }, [page, pageSize])

  return (
    <>
      <Box className="box-content">
        {/* <AppBar
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
        </AppBar> */}
        <Menu/>
        {open && (
          <FormEditAppointment
            open={open}
            setOpen={setOpen}
            data={dataModal}
            onChangedUsers={async () => setPageSize(pageSize + 1)}
          />
        )}
        <Box sx={{ p: 4 }} className="pt-4">
          <AppointmentFilter
            columns={columnsToFilter}
            rows={appointments}
            setFilteredRows={setFilteredRows}
            setPage={setPage}
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
                Detalle de las Citas Médicas
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12}>
            <AppointmentTable
              filteredRows={filteredRows.map((appointment) => ({
                ...appointment,
                id: Number(appointment.id),
              }))}
              columns={columns}
              onPageChange={setPage}
              onSizeChange={setPageSize}
              appointments={appointments.map((appointment) => ({
                ...appointment,
                id: Number(appointment.id),
              }))}
            />
          </Grid>
        </Box>
      </Box>
    </>
  )
}
