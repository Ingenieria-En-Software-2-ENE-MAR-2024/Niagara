import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const TableFilter: React.FC<any> = ({}) => {
  
  const [filterText, setFilterText] = useState<string>('') // Text column to filter

  const handleChangeFilterText = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFilterText(event.target.value)
  }

  return (
    <div style={{ marginTop: '10px', marginBottom: '20px', justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
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
				style={{ height: '50px', alignItems: 'center', justifyContent: 'center'}} 
      >
				<SearchIcon />
      </Button>
    </div>
  )
}

export default TableFilter
