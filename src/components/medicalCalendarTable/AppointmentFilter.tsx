import React, { useState } from 'react'
import { MenuItem, TextField, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface TableFilterProps {
  columns: string[]
  rows: any[]
  setFilteredRows: React.Dispatch<React.SetStateAction<any[]>>
}

const TableFilter: React.FC<TableFilterProps> = ({
  columns,
  rows,
  setFilteredRows,
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
      filterColumn === 'ID Paciente'
        ? 'id_patient'
        : filterColumn === 'Nombre y Apellido'
          ? 'name_patient'
          : filterColumn === 'Área o Especialidad'
            ? 'speciality'
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
        }}
      >
        <SearchIcon />
      </Button>
    </div>
  )
}

export default TableFilter
