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
    IconButton,
    Tooltip,
} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';

interface User {
    Name: string;
    Email: string;
    Role: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    Actions: any;
}

interface ModalUserProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: User;
    isLocked: Boolean;
}

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
}) => {
    //form fields states
    const [name, setName] = useState(data.Name);
    const [email, setEmail] = useState(data.Email);
    const [role, setRole] = useState(data.Role);
    const [updatedAt, setUpdatedAt] = useState(data.UpdatedAt);

    const handleSubmitDialog = async () => {
        setOpen(false);
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
                                    <MenuItem value={"Role 1"}>
                                        Role 1
                                    </MenuItem>
                                    <MenuItem value={"Role 2"}>
                                        Role 2
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
 * Create the user deletion modal
 *
 * @param {*} open Indicates if the modal is open
 * @param {*} setOpen Open status setter function.
 * @param {*} data Data of the user to delete
 * @returns A dialog component with the form to delete a user
 */
const ModalUserDelete: React.FC<ModalUserProps>  = ({ open, setOpen, data }) => {
    const handleDelete = async () => {
        setOpen(false);
    };
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{`Are you sure you want to delete this user?`}</DialogTitle>
            <DialogContent>
                <Typography sx={{ pb: 4 }}>
                    {`It seems that you are trying to delete the user: "${data.Name}".\nAre you sure?`}
                </Typography>
                <Box display="flex" flexDirection="row-reverse">
                    <Button variant="contained" onClick={() => setOpen(false)}>
                        <Typography>Cancel</Typography>
                    </Button>
                    <Box sx={{ pr: 1 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#f44336",
                                ":hover": {
                                    backgroundColor: "red",
                                },
                            }}
                            onClick={(_) => handleDelete()}
                        >
                            <Typography>Delete</Typography>
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

/**
 * Create the user suspension modal
 *
 * @param {*} open Indicates if the modal is open
 * @param {*} setOpen Open status setter function.
 * @param {*} data Data of the user to suspend
 * @returns A dialog component with the form to suspend a user
 */
const ModalUserSuspend: React.FC<ModalUserProps> = ({ open, setOpen, isLocked, data }) => {
    const intention = isLocked ? "resume" : "suspend";

    const handleSuspend = async () => {
        setOpen(false);

    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{`Are you sure you want to ${intention} this user?`}</DialogTitle>
            <DialogContent>
                <Typography sx={{ pb: 4 }}>
                    {`It seems that you are trying to ${intention} the user: "${data.Name}".\nAre you sure?`}
                </Typography>
                <Box display="flex" flexDirection="row-reverse">
                    <Button variant="contained" onClick={() => setOpen(false)}>
                        <Typography>Cancel</Typography>
                    </Button>
                    <Box sx={{ pr: 1 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#ffaf24",
                                ":hover": {
                                    backgroundColor: "orange",
                                },
                            }}
                            onClick={(_) => handleSuspend()}
                        >
                            <Typography>
                                {!isLocked ? "Suspend" : "Resume"}
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export { ModalUserEdit, ModalUserDelete, ModalUserSuspend };