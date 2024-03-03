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
    MedicalCalendarTable,
} from '../../components/medicalCalendarTable/MedicalCalendarTable'
import { Edit, Delete } from '@mui/icons-material'
import AppointmentFilter from '../../components/medicalCalendarTable/AppointmentFilter'
import Swal from 'sweetalert2'
import { HeaderNiagara } from '@/components/HeaderNiagara'

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
            },
            {
                date: '2024-02-26',
                time: '15:00',
                id: '124',
                fullName: 'Maria Rodriguez',
                specialty: 'Oftalmología',
            },
            {
                date: '2024-01-26',
                time: '15:00',
                id: '125',
                fullName: 'Pablo Rodriguez',
                specialty: 'Oftalmología',
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
            <HeaderNiagara />
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
