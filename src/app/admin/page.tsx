"use client"
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Grid,
  Typography,
  AppBar,
  Toolbar
} from '@mui/material';
import { User, UserTable } from "../../components/userTable/UserTable";
import {
    ModalUserEdit,
    ModalUserDelete,
    ModalUserSuspend
} from "../../components/adminModal/AdminUserModals";
import TableFilter from "../../components/userTable/TableFilter";
import { Edit, Lock, LockOpen, Delete } from '@mui/icons-material';

export interface UserNoActions {
    Name: string;
    Email: string;
    Role: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
}

const dummyUsers: UserNoActions[] = [
    {
        Name: "John Doe",
        Email: "john@example.com",
        Role: "Admin",
        CreatedAt: "2023-01-01",
        UpdatedAt: "2023-01-02",
        DeletedAt: "",
    },
    {
        Name: "Jane Smith",
        Email: "jane@example.com",
        Role: "User",
        CreatedAt: "2023-01-03",
        UpdatedAt: "2023-01-04",
        DeletedAt: "",
    },
    {
        Name: "Michael Johnson",
        Email: "michael@example.com",
        Role: "User",
        CreatedAt: "2023-01-05",
        UpdatedAt: "2023-01-06",
        DeletedAt: "",
    },
    {
        Name: "Emily Brown",
        Email: "emily@example.com",
        Role: "User",
        CreatedAt: "2023-01-07",
        UpdatedAt: "2023-01-08",
        DeletedAt: "",
    },
    {
        Name: "Alex Wilson",
        Email: "alex@example.com",
        Role: "User",
        CreatedAt: "2023-01-09",
        UpdatedAt: "2023-01-10",
        DeletedAt: "",
    },
    {
        Name: "Sophia Martinez",
        Email: "sophia@example.com",
        Role: "User",
        CreatedAt: "2023-01-11",
        UpdatedAt: "2023-01-12",
        DeletedAt: "",
    },
    {
        Name: "William Anderson",
        Email: "william@example.com",
        Role: "User",
        CreatedAt: "2023-01-13",
        UpdatedAt: "2023-01-14",
        DeletedAt: "",
    },
    {
        Name: "Olivia Taylor",
        Email: "olivia@example.com",
        Role: "User",
        CreatedAt: "2023-01-15",
        UpdatedAt: "2023-01-16",
        DeletedAt: "",
    },
    {
        Name: "Ethan Thomas",
        Email: "ethan@example.com",
        Role: "User",
        CreatedAt: "2023-01-17",
        UpdatedAt: "2023-01-18",
        DeletedAt: "",
    },
    {
        Name: "Ava Hernandez",
        Email: "ava@example.com",
        Role: "User",
        CreatedAt: "2023-01-19",
        UpdatedAt: "2023-01-20",
        DeletedAt: "",
    },
    {
        Name: "Matthew Young",
        Email: "matthew@example.com",
        Role: "User",
        CreatedAt: "2023-01-21",
        UpdatedAt: "2023-01-22",
        DeletedAt: "",
    },
    {
        Name: "Isabella King",
        Email: "isabella@example.com",
        Role: "User",
        CreatedAt: "2023-01-23",
        UpdatedAt: "2023-01-24",
        DeletedAt: "",
    },
    {
        Name: "James Lopez",
        Email: "james@example.com",
        Role: "User",
        CreatedAt: "2023-01-25",
        UpdatedAt: "2023-01-26",
        DeletedAt: "",
    },
    {
        Name: "Mia Scott",
        Email: "mia@example.com",
        Role: "User",
        CreatedAt: "2023-01-27",
        UpdatedAt: "2023-01-28",
        DeletedAt: "",
    },
    {
        Name: "Benjamin Green",
        Email: "benjamin@example.com",
        Role: "User",
        CreatedAt: "2023-01-29",
        UpdatedAt: "2023-01-30",
        DeletedAt: "",
    },
];

const createData = (Name: string, Email: string, Role: string, CreatedAt: string, UpdatedAt: string, DeletedAt: string, Actions: any): any => {
    return { Name, Email, Role, CreatedAt, UpdatedAt, DeletedAt, Actions };
};

const columns: string[] = [
    "Name",
    "Email",
    "Role",
    "CreatedAt",
    "UpdatedAt",
    "DeletedAt",
    "Actions",
];
const columnsToFilter: string[] = [columns[0], columns[1], columns[2]];

export default function AdminPage () {
    const [editing, setEditing] = useState<boolean>(false);
    const [removing, setRemoving] = useState<boolean>(false);
    const [suspending, setSuspending] = useState<boolean>(false);
    const [dataModal, setDataModal] = useState<any>(null);

    const [users, setUsers] = useState<User[]>([]);
    const [filteredRows, setFilteredRows] = useState<User[]>(users);

    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);

    /**
     * User modify management
     *
     * @param {*} user user to edit
     */
    const modifyUser = (user: UserNoActions) => {
        setDataModal(user);
        setEditing(true);
    };

    /**
     * User remove management
     *
     * @param {*} userName user's username
     */
    const handleRemoveUser = (userName: string) => {
        setDataModal({ userName });
        setRemoving(true);
    };

    /**
     * User suspension management
     *
     * @param {*} userName user's username
     * @param {*} suspended user's suspend state
     */
    const toggleLock = (userName: string, suspended: boolean) => {
        setDataModal({ userName, suspended });
        setSuspending(true);
    };

    useEffect(() => {
        const fetchUsers = async (page: number, pageSize: number) => {
            try {
                const startIndex = page * pageSize;
                const endIndex = startIndex + pageSize;
                const allUsers = dummyUsers.slice(startIndex, endIndex);
                const userList = allUsers.map((user: UserNoActions) => {
                    return createData(
                        user.Name,
                        user.Email,
                        user.Role,
                        user.CreatedAt,
                        user.UpdatedAt,
                        user.DeletedAt,
                        createActionsComponent({ user })
                    );
                });
                setUsers(userList);
                setFilteredRows(userList);
            } catch (e) {
                return;
            }
        };

        /**
         * Create the component that contains the actions on the users
         *
         * @param {*} user user to whom the actions will be performed
         * @returns A component that contains the actions on the users
         */
        const createActionsComponent: React.FC<{ user: UserNoActions }> = ({ user }) => {
            return (
                <Grid container justifyContent="center" columns={4} spacing={1.5}>
                    <Grid item xs={1} justifyContent="right">
                        <Tooltip title="Modify user" arrow>
                            <IconButton
                                color="primary"
                                onClick={() => modifyUser(user)}
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={1} justifyContent="center">
                        <Tooltip
                            title={true /*user.suspended*/ ? "Resume user" : "Suspend user"}
                            arrow
                        >
                            <IconButton
                                color="primary"
                            >
                                {true /**user.suspended */ ? <LockOpen /> : <Lock />}
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={0} justifyContent="left">
                        <Tooltip title="Delete user" arrow>
                            <IconButton
                                color="primary"
                                onClick={() => handleRemoveUser(user.Name)}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            );
        };
    
        fetchUsers(page, pageSize);
    }, [page, pageSize]);

    return (
        <>
            {editing && (
                <ModalUserEdit
                    open={editing}
                    setOpen={setEditing}
                    data={dataModal}
                    isLocked={false}
                />
            )}
            {removing && (
                <ModalUserDelete
                    open={removing}
                    setOpen={setRemoving}
                    data={dataModal}
                    isLocked={false}
                />
            )}
            {suspending && (
                <ModalUserSuspend
                    open={suspending}
                    setOpen={setSuspending}
                    isLocked={dataModal?.suspended || false}
                    data={dataModal}
                />
            )}
            <Box className="box-content">
                <AppBar position="fixed">
                    <Toolbar className="navbar">
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {`Administrator Dahsboard`}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{ p: 4 }}>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        paddingRight="1px"
                    >
                        <Typography variant="h5" className="welcome-text">
                            User List
                        </Typography>
                    </Grid>
                    <Grid item md={12}>
                        <TableFilter
                            columns={columnsToFilter}
                            rows={users}
                            setFilteredRows={setFilteredRows}
                        />
                        <UserTable
                            filteredRows={filteredRows}
                            columns={columns}
                            onPageChange={setPage}
                            onSizeChange={setPageSize}
                            users={users}
                        />
                    </Grid>
                </Box>
            </Box>
        </>
    );
};


