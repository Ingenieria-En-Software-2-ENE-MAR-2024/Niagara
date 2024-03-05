'use client'

import React, { useState } from 'react'
import { TextField, SelectField } from '@/components/Fields'
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';


interface Props {
    idPacient: string;
    name: string;
    speciality: string;
    doctor: string;
    originalDate: Date;
    originalTime: string;
    originalDescription: string;
}

export function FormEditAppointment({ idPacient = "32", name = "Adolf Hitler", speciality = "Ginecologia", doctor = "Hugo Chavez", originalDate = new Date("2023/02/03"), originalTime = "10:00", originalDescription = "Necesita un cambio de genero" }: Props) {
    const [date, setDate] = useState<Date>(originalDate);
    const [time, setTime] = useState(originalTime);
    const [description, setDescription] = useState(originalDescription);
    const [changeReason, setChangeReason] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const router = useRouter();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log({ date, time, description }); // aqui iria el fetch
        //const router = useRouter();
        //router.back();
    }

    const onCancel = () => {
        router.back();
    }

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 8; hour <= 17; hour++) {
            const timeString = `${hour}:00`;
            options.push(
                <option key={timeString} value={timeString}>{timeString}</option>
            );
        }
        return options;
    }

    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        return `${year}-${formattedMonth}-${formattedDay}`;
    }



    return (
        <AuthLayout 
        title="Editción de la cita médica"
        subtitle=""
        >
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            <form onSubmit={onSubmit}>
                <TextField
                    value={idPacient}
                    label="ID Paciente"
                    disabled
                    className="mt-6"
                />

                <TextField
                    value={name}
                    label="Nombre y Apellido"
                    disabled
                    className="mt-6"
                />

                <TextField
                    value={speciality}
                    label="Área o Especialidad"
                    disabled
                    className="mt-6"
                />

                <TextField
                    value={doctor}
                    label="Médico o Especialista"
                    disabled
                    className="mt-6"
                />

                <TextField
                    value={formatDate(date)}    
                    onChange={(e) => setDate(new Date(e.target.value))}
                    label="Fecha (dd/mm/yy)"
                    type="date"
                    className="mt-6"
                />

                <SelectField
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    label="Hora"
                    className="mt-6"
                >
                    {generateTimeOptions()}
                </SelectField>

                <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Descripción"
                    className="mt-6"
                />

                <TextField
                    value={changeReason}
                    onChange={(e) => setChangeReason(e.target.value)}
                    label="Razón de cambio"
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
