import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material'
import AppointmentTableRowStyle from './AppointmentTableRowStyle'
import AppointmentTableCellStyle from './AppointmentTableCellStyle'

export interface Appointment {
  date: string
  time: string
  id: string
  fullName: string
  specialty: string
  doctor: string
	description: string
  actions: any
}

interface AppointmentTableProps {
  columns: string[]
  filteredRows: Appointment[]
  appointments: Appointment[]
  onPageChange?: (page: number) => void
  onSizeChange?: (pageSize: number) => void
}

export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  columns,
  filteredRows,
  appointments,
  onPageChange = undefined,
  onSizeChange = undefined,
}) => {
  const [page, setPage] = useState(0) // List page
  const [rowsPerPage, setRowsPerPage] = useState(5) // Number of rows to show

  /**
   * Calculates the page number for a given first Appointment index based on the new number of rows per page.
   * @param {String} firstAppointmentIndex - The index of the first Appointment being displayed.
   * @param {String} newRowsPerPage - The new number of Appointments per page.
   * @returns the page number where the first Appointment will be located after changing the number of rows per page.
   */
  const calculateOnResizePage = (firstAppointmentIndex: any, newRowsPerPage: any) => {
    return Math.floor(firstAppointmentIndex / newRowsPerPage)
  }

  /**
   * Handles the page change event and updates the current page state.
   */
  const handlePageChange = (_: any, newPage: any) => {
    setPage(newPage)
    if (onPageChange !== undefined) onPageChange(newPage)
  }

  /**
   * Handles the rows per page change event and updates the current page state and rows per page.
   */
  const handleRowsPerPageChange = (event: any) => {
    const newRowsPerPage = parseInt(event.target.value, 10)
    const newPage = calculateOnResizePage(page * rowsPerPage, newRowsPerPage)
    setRowsPerPage(newRowsPerPage)
    setPage(newPage)

    if (onSizeChange !== undefined) onSizeChange(newRowsPerPage)

    if (onPageChange !== undefined) onPageChange(newPage)
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <AppointmentTableCellStyle
                  sx={column === 'Actions' ? { textAlign: 'center' } : {}}
                  key={index}
                >
                  {column}
                </AppointmentTableCellStyle>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows &&
              filteredRows.map((row, index) => (
                <AppointmentTableRowStyle key={index}>
                  <AppointmentTableCellStyle align="left">
                    {row.date}
                  </AppointmentTableCellStyle>
                  <AppointmentTableCellStyle align="left">
                    {row.time}
                  </AppointmentTableCellStyle>
                  <AppointmentTableCellStyle align="left">
                    {row.id}
                  </AppointmentTableCellStyle>
                  <AppointmentTableCellStyle align="left">
                    {row.fullName}
                  </AppointmentTableCellStyle>
                  <AppointmentTableCellStyle align="left">
                    {row.specialty}
                  </AppointmentTableCellStyle>
									<AppointmentTableCellStyle align="left">
                    {row.doctor}
                  </AppointmentTableCellStyle>
									<AppointmentTableCellStyle align="left">
                    {row.description}
                  </AppointmentTableCellStyle>
                  <AppointmentTableCellStyle align="left">
                    {row.actions}
                  </AppointmentTableCellStyle>
                </AppointmentTableRowStyle>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={-1}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        labelRowsPerPage={'Rows per page'}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to}`}
        nextIconButtonProps={{
          disabled: appointments.length < rowsPerPage,
        }}
      />
    </>
  )
}
