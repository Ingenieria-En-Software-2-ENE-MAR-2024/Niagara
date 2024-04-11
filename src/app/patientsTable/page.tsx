'use client'

import { useState, useEffect } from 'react'
import { Box, IconButton, Tooltip, Grid, Typography } from '@mui/material'
import {
    ClinicHistory,
    PatientTable,
    Patient
} from '../../components/patientTable/PatientTable'
import { Edit, Visibility } from '@mui/icons-material'
import PatientFilter from '../../components/patientTable/PatientFilter'
import Swal from 'sweetalert2'
import Menu from '@/components/Menu'
import { useRouter } from 'next/router'
import { FormEditClinicHistory, Section } from '@/components/FormEditClinicHistory'
import { getSession } from 'next-auth/react'

const createData = (
    id: number,
    name: string,
    ci: string,
    email: string,
    actions: any,
): Patient => {
    return { id, name, ci, email, actions };
}

const columns: string[] = [
    'ID Paciente',
    'Nombre Paciente',
    'Cedula Paciente',
    'Email Paciente',
    'Acciones',
]
const columnsToFilter: string[] = [columns[0], columns[1], columns[2]]

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export default function PatientsTablePage() {
    const [open, setOpen] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [dataModal, setDataModal] = useState<any>(null)
    const [patients, setPatients] = useState<Patient[]>([])
    const [filteredRows, setFilteredRows] = useState<Patient[]>(patients)

    const [page, setPage] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(5)

    useEffect(() => {
        const fetchPatients = async (page: number, pageSize: number) => {
            try {
                const session = await getSession()

                const response = await fetch(`${baseUrl}/api/patientAll`, {
                    method: 'GET',
                    headers: {
                        'access-token': `Bearer ${session?.user.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: null,
                })
                if (!response.ok) {
                    const errorText = await response.text()
                    console.log('an error ocurred fetching the patients')
                    console.log(errorText)
                    return
                }
                //console.log(response)
                

                const startIndex = page * pageSize
                const endIndex = startIndex + pageSize
                const allAppoint = await response.json()
                //console.log(allAppoint)
                const patientsSliced = allAppoint.slice(startIndex, endIndex)
                const patientsList = patientsSliced.map(
                    (patient: Patient) => {
                        return createData(
                            patient.id,
                            patient.name,
                            patient.ci,
                            patient.email,
                            createActionsComponent({ patient }),
                        )
                    },
                )
                setPatients(patientsList)
                setFilteredRows(patientsList)
            } catch (e) {
                return
            }
        }

        const handleModal = (patientId: number, edit: boolean) => {
            setEdit(edit)
            setDataModal(patientId)
            setOpen(true)
        }

        const createActionsComponent: React.FC<{ patient: Patient }> = ({
            patient,
        }) => {
            return (
                <Grid container justifyContent="flex-start" columns={4} spacing={1.5}>
                    <Grid item xs={1} justifyContent="left">
                        <Tooltip title="Añadir/Editar historia clinica" arrow>
                            <IconButton
                                color="primary"
                                className="text-tertiary"
                                onClick={() => handleModal(patient.id, true)}
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={0} justifyContent="left">
                        <Tooltip title="Ver historia clinica" arrow>
                            <IconButton
                                color="primary"
                                className="text-tertiary"
                                onClick={() => handleModal(patient.id, false)}
                            >
                                <Visibility />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            )
        }

        fetchPatients(page, pageSize)
    }, [page, pageSize])

    return (
        <>
            <Menu />
            {open && (
                <FormEditClinicHistory
                    open={open}
                    setOpen={setOpen}
                    id={dataModal}
                    edit={edit}
                    onChange={async () => setPageSize(pageSize + 1)}
                />
            )}
            <Box className="box-content">
                <Box sx={{ p: 4 }} className="pt-8">
                    <PatientFilter
                        columns={columnsToFilter}
                        rows={patients}
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
                                Pacientes
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={12}>
                        <PatientTable
                            filteredRows={filteredRows}
                            columns={columns}
                            onPageChange={setPage}
                            onSizeChange={setPageSize}
                            patients={patients}
                        />
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
