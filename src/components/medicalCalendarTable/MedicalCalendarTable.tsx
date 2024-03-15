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
import UserTableCellStyle from '../userTable/UserTableCellStyle'
import UserTableRowStyle from '../userTable/UserTableRowStyle'

export interface Appointment {
  end_date: string
  start_hour: string
  id: number
  id_patient: string
  name_patient: string
  speciality: string
  actions: any
}

interface MedicalCalendarTableProps {
  columns: string[]
  filteredRows: Appointment[]
  appointments: Appointment[]
  onPageChange?: (page: number) => void
  onSizeChange?: (pageSize: number) => void
}

export const MedicalCalendarTable: React.FC<MedicalCalendarTableProps> = ({
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
  const calculateOnResizePage = (
    firstAppointmentIndex: any,
    newRowsPerPage: any,
  ) => {
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
                <UserTableCellStyle
                  sx={column === 'Actions' ? { textAlign: 'center' } : {}}
                  key={index}
                >
                  {column}
                </UserTableCellStyle>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows &&
              filteredRows.map((row, index) => (
                <UserTableRowStyle key={index}>
                  <UserTableCellStyle align="left">
                    {row.end_date}
                  </UserTableCellStyle>
                  <UserTableCellStyle align="left">
                    {row.start_hour}
                  </UserTableCellStyle>
                  <UserTableCellStyle align="left">{row.id}</UserTableCellStyle>
                  <UserTableCellStyle align="left">
                    {row.name_patient}
                  </UserTableCellStyle>
                  <UserTableCellStyle align="left">
                    {row.speciality}
                  </UserTableCellStyle>
                  <UserTableCellStyle align="left">
                    {row.actions}
                  </UserTableCellStyle>
                </UserTableRowStyle>
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