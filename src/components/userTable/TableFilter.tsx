import React, { useState } from "react";
import { MenuItem, TextField, Button, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


interface TableFilterProps {
    columns: string[];
    rows: any[];
    setFilteredRows: React.Dispatch<React.SetStateAction<any[]>>;
    handleCreateUser: () => void;
}

const TableFilter: React.FC<TableFilterProps> = ({ columns, rows, setFilteredRows, handleCreateUser }) => {
    const [filterColumn, setFilterColumn] = useState<string>(""); // Column to filter
    const [filterText, setFilterText] = useState<string>(""); // Text column to filter

    const handleChangeFilterColumn = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilterColumn(event.target.value as string);
    };

    const handleChangeFilterText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value);
    };

    const handleFilter = () => {
        if (filterColumn === "") {
            setFilteredRows(rows);
        } else {
            const filteredRows = rows.filter(
                (row) =>
                    row[filterColumn.toLowerCase()] &&
                    row[filterColumn.toLowerCase()]
                        .toLowerCase()
                        .includes(filterText.toLowerCase())
            );
            setFilteredRows(filteredRows);
        }
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <TextField
                select
                label="Filter By"
                value={filterColumn}
                onChange={handleChangeFilterColumn}
                variant="outlined"
                style={{ width: "150px", marginRight: "10px" }}
            >
                {columns.map((column) => (
                    <MenuItem key={column} value={column}>
                        {column}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Search by"
                value={filterText}
                onChange={handleChangeFilterText}
                variant="outlined"
                style={{ marginRight: "10px" }}
            />
            <Button
                className="bg-blue-600"
                variant="contained"
                onClick={handleFilter}
                startIcon={<SearchIcon />}
            >
                Search
            </Button>
            <Button
              variant="contained"
              className="bg-blue-600 sm:ml-6 md:ml-16"
              onClick={handleCreateUser}
              startIcon={<i className="bi bi-plus-circle "></i>}
            >
              <Typography variant="subtitle1" className="text-options-button">
                Create User
              </Typography>
            </Button>
        </div>
    );
};

export default TableFilter;