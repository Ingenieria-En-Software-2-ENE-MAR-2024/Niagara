'use client'

import { useState, useEffect } from 'react'
import { Box, IconButton, Tooltip, Grid, Typography } from '@mui/material'
import {
    ClinicHistory,
    ClinicHistoryTable,
} from '../../components/clinicHistoryTable/ClinicHistoryTable'
import { Edit, Visibility } from '@mui/icons-material'
import ClinicHistoryFilter from '../../components/clinicHistoryTable/ClinicHistoryFilter'
import Swal from 'sweetalert2'
import Menu from '@/components/Menu'
import { useRouter } from 'next/router'
import { FormEditClinicHistory, Section } from '@/components/FormEditClinicHistory'
import { getSession } from 'next-auth/react'

const createData = (
    sections: Section[],
    actions: any,
): ClinicHistory => {
    return { sections, actions };
}

const columns: string[] = [
    'ID Paciente',
    'Nombre Paciente',
    'Edad Paciente',
    'Genero Paciente',
    'Email Paciente',
    'Acciones',
]
const columnsToFilter: string[] = [columns[0], columns[1], columns[2]]

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export default function ClinicHistoryTablePage() {
    const [open, setOpen] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [dataModal, setDataModal] = useState<any>(null)
    const [clinicHistory, setClinicHistory] = useState<ClinicHistory[]>([])
    const [filteredRows, setFilteredRows] = useState<ClinicHistory[]>(clinicHistory)

    const [page, setPage] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(5)

    useEffect(() => {
        const fetchClinicHistorys = async (page: number, pageSize: number) => {
            try {
                const session = await getSession()

                const response = await fetch(`${baseUrl}/api/clinicHistory`, {
                    method: 'GET',
                    headers: {
                        'access-token': `Bearer ${session?.user.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: null,
                })
                if (!response.ok) {
                    const errorText = await response.text()
                    console.log('an error ocurred fetching the clinicHistory')
                    console.log(errorText)
                    return
                }

                const startIndex = page * pageSize
                const endIndex = startIndex + pageSize
                const allAppoint = await response.json()
                console.log(allAppoint)
                const clinicHistorySliced = allAppoint.slice(startIndex, endIndex)
                const clinicHistoryList = clinicHistorySliced.map(
                    (clinicHistory: ClinicHistory) => {
                        return createData(
                            clinicHistory.sections,
                            createActionsComponent({ clinicHistory }),
                        )
                    },
                )
                setClinicHistory(clinicHistoryList)
                setFilteredRows(clinicHistoryList)
            } catch (e) {
                return
            }
        }

        const handleModal = (clinicHistory: ClinicHistory, edit: boolean) => {
            setEdit(edit)
            setDataModal(clinicHistory.sections)
            setOpen(true)
        }

        const createActionsComponent: React.FC<{ clinicHistory: ClinicHistory }> = ({
            clinicHistory,
        }) => {
            return (
                <Grid container justifyContent="flex-start" columns={4} spacing={1.5}>
                    <Grid item xs={1} justifyContent="left">
                        <Tooltip title="Editar historia clinica" arrow>
                            <IconButton
                                color="primary"
                                className="text-tertiary"
                                onClick={() => handleModal(clinicHistory, true)}
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
                                onClick={() => handleModal(clinicHistory, false)}
                            >
                                <Visibility />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            )
        }

        //fetchClinicHistorys(page, pageSize)
    }, [page, pageSize])

    return (
        <>
            <Menu />
            {open && (
                <FormEditClinicHistory
                    open={open}
                    setOpen={setOpen}
                    sections={dataModal}
                    edit={edit}
                    onChange={async () => setPageSize(pageSize + 1)}
                />
            )}
            <Box className="box-content">
                <Box sx={{ p: 4 }} className="pt-24">
                    <ClinicHistoryFilter
                        columns={columnsToFilter}
                        rows={clinicHistory}
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
                                Historia Clinica
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={12}>
                        <ClinicHistoryTable
                            filteredRows={filteredRows}
                            columns={columns}
                            onPageChange={setPage}
                            onSizeChange={setPageSize}
                            clinicHistory={clinicHistory}
                        />
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
