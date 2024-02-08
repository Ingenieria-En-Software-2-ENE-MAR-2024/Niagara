import { useState } from "react";

// MUI
import {
    TextField,
    Grid,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    InputAdornment,
    DialogTitle,
    Select,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    Actions: any;
    password: string;
}

interface ModalUserProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: User;
    onChangedUsers: any;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Create the user creation modal
 *
 * @param {*} open Indicates if the modal is open
 * @param {*} setOpen Open status setter function.
 * @param {*} create Indicates if the modal must create a new user or edit it
 * @param {*} data User data in case the modal i used to edit
 * @returns A dialog component with the form to create a user
 */
const ModalUserEdit: React.FC<ModalUserProps> = ({
    open,
    setOpen,
    data,
    onChangedUsers = undefined,
}) => {
    //form fields states
    const [name, setName] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [role, setRole] = useState(data.role);

    const handleSubmitDialog = async () => {
        if (name === "" || email === "" || role === "") {
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/api/users/${data.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, role, password: data.password }),
              })

            if (!response.ok) {
                console.log('User could not be edited')
                return;
            }
            console.log('User edited')
            if (onChangedUsers != undefined) onChangedUsers();
        } catch (e) {
            console.log('An error ocurred editing the user')
            return;
        } finally {
            setOpen(false);
        }
    };


    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleChangeRole = (event: SelectChangeEvent<string>) => {
        setRole(event.target.value);
    };
    
    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit User"}
                </DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                value={name}
                                onChange={handleChangeName}
                                id="Name"
                                label="Name"
                                fullWidth
                                style={{ marginTop: "0.5rem" }}
                                InputProps={{
                                    placeholder: "Name",
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            className="bi bi-person"
                                        />
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={handleChangeEmail}
                                id="Email"
                                label="Email"
                                fullWidth
                                InputProps={{
                                    placeholder: "Email",
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            className="bi bi-person"
                                        />
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="select-role-label">
                                    Select a Role
                                </InputLabel>
                                <Select
                                    labelId="select-role-label"
                                    label="Select an option"
                                    value={role}
                                    onChange={handleChangeRole}
                                >
                                    <MenuItem value={"Admin"}>
                                        Admin
                                    </MenuItem>
                                    <MenuItem value={"Client"}>
                                        Client
                                    </MenuItem>
                                    <MenuItem value={"Doctor"}>
                                        Doctor
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmitDialog} autoFocus>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


/**
 * Create the user creation modal
 *
 * @param {*} open Indicates if the modal is open
 * @param {*} setOpen Open status setter function.
 * @param {*} create Indicates if the modal must create a new user or edit it
 * @param {*} data User data in case the modal i used to edit
 * @returns A dialog component with the form to create a user
 */
const ModalUserCreate: React.FC<ModalUserProps> = ({
    open,
    setOpen,
    data,
    onChangedUsers = undefined,
}) => {
    //form fields states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmitDialog = async () => {
        if (name === "" || email === "" || role === "" || password === "") {
            console.log("Faltaron datos.")
            return;
        }

       

        // console.log({ name, email, role, password})

        try {
            const response = await fetch(`${baseUrl}/api/users`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, role, password})
              })

            if (!response.ok) {
                // console.log(response)
                console.log('User could not be created')
                return;
            }
            console.log('User created')
            if (onChangedUsers != undefined) onChangedUsers();
        } catch (e) {
            console.log('An error ocurred creating the user')
            return;
        } finally {
            setOpen(false);
        }
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleChangeRole = (event: SelectChangeEvent<string>) => {
        setRole(event.target.value);
    };
    
    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Create User"}
                </DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                value={name}
                                onChange={handleChangeName}
                                id="Name"
                                label="Name"
                                fullWidth
                                style={{ marginTop: "0.5rem" }}
                                InputProps={{
                                    placeholder: "Name",
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            className="bi bi-person"
                                        />
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={handleChangeEmail}
                                id="Email"
                                label="Email"
                                fullWidth
                                InputProps={{
                                    placeholder: "Email",
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            className="bi bi-person"
                                        />
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="select-role-label">
                                    Select a Role
                                </InputLabel>
                                <Select
                                    labelId="select-role-label"
                                    label="Select an option"
                                    value={role}
                                    onChange={handleChangeRole}
                                >
                                    <MenuItem value={"Admin"}>
                                        Admin
                                    </MenuItem>
                                    <MenuItem value={"Client"}>
                                        Client
                                    </MenuItem>
                                    <MenuItem value={"Doctor"}>
                                        Doctor
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                                <TextField
                                    value={password}
                                    onChange={handleChangePassword}
                                    id="Password"
                                    label="Password"
                                    fullWidth
                                    InputProps={{
                                        placeholder: "Password",
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                className="bi bi-lock"
                                            />
                                        ),
                                    }}
                                />
                            </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmitDialog} autoFocus>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


/**
 * Create the user deletion modal
 *
 * @param {*} open Indicates if the modal is open
 * @param {*} setOpen Open status setter function.
 * @param {*} data Data of the user to delete
 * @returns A dialog component with the form to delete a user
 */
const ModalUserDelete: React.FC<ModalUserProps>  = ({ open, setOpen, data, onChangedUsers = undefined }) => {

    const handleDelete = async (data: any) => {
        try {
            const response = await fetch(`${baseUrl}/api/users/${data.userId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: null,
            })
              
        
            if (!response.ok) {
                console.log('User could not be deleted')
                return;
            }
            console.log('User deleted')
            if (onChangedUsers != undefined) onChangedUsers();
        } catch (e) {
            console.log('An error ocurred deleting the user')
            return;
        } finally {
            setOpen(false);
        }

    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{`Are you sure you want to delete this user?`}</DialogTitle>
            <DialogContent>
                <Typography sx={{ pb: 4 }}>
                    {`It seems that you are trying to delete the user: "${data.name}".\nAre you sure?`}
                </Typography>
                <Box display="flex" flexDirection="row-reverse">
                    <Button className="bg-blue-600" variant="contained" onClick={() => setOpen(false)}>
                        <Typography>Cancel</Typography>
                    </Button>
                    <Box sx={{ pr: 1 }}>
                        <Button
                            className="bg-red-600"
                            variant="contained"
                            sx={{
                                backgroundColor: "#f44336",
                                ":hover": {
                                    backgroundColor: "red",
                                },
                            }}
                            onClick={() => handleDelete(data)}
                        >
                            <Typography>Delete</Typography>
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export { ModalUserEdit, ModalUserDelete, ModalUserCreate };