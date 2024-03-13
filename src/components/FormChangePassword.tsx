import React, { useState } from 'react';
import { TextField } from '@/components/Fields';
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/Button';
import {useRouter} from "next/router";
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';


export function FormChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [compareNewPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [messageType, setMessageType] = useState('');

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (newPassword !== compareNewPassword) {
            setErrorMessage('*Las contraseñas no coinciden.');
            return;
        }
        if (oldPassword === newPassword) {
            setErrorMessage('*La nueva contraseña no puede ser igual a la anterior.');
            return;
        }
        if (newPassword.length < 8) {
            setErrorMessage('*La contraseña debe tener al menos 8 caracteres.');
            return;
        }
        if ((oldPassword === '') || (newPassword === '') || (compareNewPassword === '')) {
            setErrorMessage('*Por favor, llene todos los campos.');
            return;
        }
    
        /*
        const response = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword, newPassword, compareNewPassword }),
        });

        if (!response.ok) {
            console.error('Error:', response.status, response.statusText);
            setMessage('No se pudo cambiar la contraseña');
            setOpen(true);
            setMessageType('error');
            return;
        }

        const data = await response.json();
        console.log(data);
        */
        setMessage('Se cambió la contraseña exitosamente');
        setOpen(true);
        setMessageType('success');
        return;
        
    }
    
    const useCancel = () => {
        const router = useRouter();
        router.back();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AuthLayout 
        title="Cambiar contraseña"
        subtitle=""
        >
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}


            <form onSubmit={onSubmit}>
                <TextField
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    label="Contraseña antigua"
                    type="password"
                    className="mt-6"
                />

                <TextField
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    label="Nueva Contraseña"
                    type="password"
                    className="mt-6"
                />

                <TextField
                    value={compareNewPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirmar Contraseña"
                    type="password"
                    className="mt-6"
                />

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', maxWidth: '200px', margin: '20px auto' }}>
                    <Button variant='solid' color="cyan" type='submit'> Confirmar </Button>
                    <Button variant='outline' color="gray" onClick={useCancel}> Cancelar </Button>
                </div>
                
            </form>

                        


            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={messageType as AlertColor} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </AuthLayout>
    );
};
