import React, { useState } from 'react'
import { MenuItem, TextField, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'

interface TableFilterProps {
  columns: string[]
  rows: any[]
  setFilteredRows: React.Dispatch<React.SetStateAction<any[]>>
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const TableFilter: React.FC<TableFilterProps> = ({
  columns,
  rows,
  setFilteredRows,
  setPage
}) => {
  const [filterColumn, setFilterColumn] = useState<string>('') // Column to filter
  const [filterText, setFilterText] = useState<string>('') // Text column to filter

  const handleChangeFilterColumn = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setFilterColumn(event.target.value as string)
  }

  const handleChangeFilterText = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFilterText(event.target.value)
    handleFilter()
  }

  const handleFilter = () => {
    const tempKey =
      filterColumn === 'Nombre y Apellido'
        ? 'name_patient'
        : filterColumn === 'Área o Especialidad'
          ? 'speciality'
          : filterColumn === 'Médico o Especialista'
            ? 'doctor'
            : ''
    if (filterColumn === '' || filterText === '') {
      setFilteredRows(rows)
    } else {
      const filteredRows = rows.filter(
        (row) =>
          row[tempKey] &&
          row[tempKey].toLowerCase().includes(filterText.toLowerCase()),
      )
      setFilteredRows(filteredRows)
    }
    setPage(0);
  }

  return (
    <div
      style={{
        marginTop: '0px',
        marginBottom: '20px',
        justifyContent: 'flex-end',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        select
        label="Filtrar por"
        value={filterColumn}
        onChange={handleChangeFilterColumn}
        variant="outlined"
        style={{ width: '150px', marginRight: '10px' }}
        InputProps={{ style: { height: '50px' } }}
      >
        {columns.map((column) => (
          <MenuItem key={column} value={column}>
            {column}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Buscar"
        value={filterText}
        onChange={handleChangeFilterText}
        variant="outlined"
        style={{ marginRight: '10px' }}
        InputProps={{ style: { height: '50px' } }}
      />
      <Button
        className="bg-tertiary"
        variant="contained"
        onClick={handleFilter}
        style={{
          height: '50px',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '10px',
        }}
      >
        <SearchIcon />
      </Button>
      <Button
        className="bg-tertiary"
        variant="contained"
        component={Link} href="/appointmentForm"
        style={{
          height: '50px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AddIcon />
      </Button>
    </div>
  )
}

export default TableFilter
