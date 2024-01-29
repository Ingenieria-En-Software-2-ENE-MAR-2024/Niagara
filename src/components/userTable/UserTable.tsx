import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    TablePagination,
} from "@mui/material";
import UserTableRowStyle from "./UserTableRowStyle";
import UserTableCellStyle from "./UserTableCellStyle";

export interface User {
    Name: string;
    Email: string;
    Role: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    Actions: any;
}

interface UserTableProps {
    columns: string[];
    filteredRows: User[];
    users: User[];
    onPageChange?: (page: number) => void;
    onSizeChange?: (pageSize: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
    columns,
    filteredRows,
    users,
    onPageChange = undefined,
    onSizeChange = undefined,
}) => {
    const [page, setPage] = useState(0); // List page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows to show

    /**
     * Calculates the page number for a given first user index based on the new number of rows per page.
     * @param {String} firstUserIndex - The index of the first user being displayed.
     * @param {String} newRowsPerPage - The new number of users per page.
     * @returns the page number where the first user will be located after changing the number of rows per page.
     */
    const calculateOnResizePage = (firstUserIndex: any, newRowsPerPage: any) => {
        return Math.floor(firstUserIndex / newRowsPerPage);
    };

    /**
     * Handles the page change event and updates the current page state.
     */
    const handlePageChange = (_: any, newPage: any) => {
        setPage(newPage);
        if (onPageChange !== undefined) onPageChange(newPage);
    };

    /**
     * Handles the rows per page change event and updates the current page state and rows per page.
     */
    const handleRowsPerPageChange = (event: any) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        const newPage = calculateOnResizePage(
            page * rowsPerPage,
            newRowsPerPage
        );
        setRowsPerPage(newRowsPerPage);
        setPage(newPage);

        if (onSizeChange !== undefined) onSizeChange(newRowsPerPage);

        if (onPageChange !== undefined) onPageChange(newPage);
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <UserTableCellStyle
                                    sx={
                                        column === "Actions"
                                            ? { textAlign: "center" }
                                            : {}
                                    }
                                    key={index}
                                >
                                    {column}
                                </UserTableCellStyle>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows &&
                            filteredRows.map((row, key) => (
                                <UserTableRowStyle key={key}>
                                    <UserTableCellStyle align="left">
                                        {row.Name}
                                    </UserTableCellStyle>
                                    <UserTableCellStyle align="left">
                                        {row.Email}
                                    </UserTableCellStyle>
                                    <UserTableCellStyle align="left">
                                        {row.Role}
                                    </UserTableCellStyle>
                                    <UserTableCellStyle align="left">
                                        {row.CreatedAt}
                                    </UserTableCellStyle>
                                    <UserTableCellStyle align="left">
                                        {row.UpdatedAt}
                                    </UserTableCellStyle>
                                    <UserTableCellStyle align="left">
                                        {row.DeletedAt}
                                    </UserTableCellStyle>
                                    <UserTableCellStyle align="left">
                                        {row.Actions}
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
                labelRowsPerPage={"Rows per page"}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to}`}
                nextIconButtonProps={{
                    disabled: users.length < rowsPerPage,
                }}
            />
        </>
    );
};