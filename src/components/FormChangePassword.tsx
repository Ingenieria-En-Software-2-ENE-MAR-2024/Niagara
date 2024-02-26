'use client'

import React, { useState } from 'react'
import { TextField } from '@/components/Fields'
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';

export function FormChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [compareNewPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

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

        console.log({ oldPassword, newPassword, compareNewPassword }); // Aquí se enviaría la data al servidor
    }

    const onCancel = () => {
        const router = useRouter();
        router.back();
    }

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
                    <Button variant='outline' color="gray" onClick={onCancel}> Cancelar </Button>
                </div>
                
            </form>
        </AuthLayout>
    );
};
