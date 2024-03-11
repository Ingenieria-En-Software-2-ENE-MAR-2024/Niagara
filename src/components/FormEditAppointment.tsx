'use client'

import React, { useState } from 'react'
import { TextField, SelectField } from '@/components/Fields'
import { Button } from '@/components/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';


interface AppointmentData {
    idPatient: string;
    name: string;
    specialty: string;
    doctor: string;
    id: string;
    originalDate: Date;
    originalTime: string;
    originalDescription: string;
}

interface ModalUserProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: AppointmentData;
    onChangedUsers: any;
}

export const FormEditAppointment: React.FC<ModalUserProps> = ({ open, setOpen, data, onChangedUsers = undefined }) => {
    const [date, setDate] = useState<Date>(data.originalDate);
    const [time, setTime] = useState(data.originalTime);
    const [description, setDescription] = useState(data.originalDescription);
    const [changeReason, setChangeReason] = useState('');

    const handleSubmitDialog = async () => {
        if (time === "" || description === "") {
            console.log("Faltaron datos.")
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/${data.id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data })
              })

            if (!response.ok) {
                // console.log(response)
                console.log('Appointment could not be edited')
                return;
            }
            console.log('Appointment edited')
            if (onChangedUsers != undefined) onChangedUsers();
        } catch (e) {
            console.log('An error ocurred editing the appointment')
            return;
        } finally {
            setOpen(false);
        }
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
                    {"Editción de la cita médica"}
                </DialogTitle>

                <DialogContent>
                    <Grid container rowSpacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                value={data.idPatient}
                                label="ID Paciente"
                                disabled
                                className="mt-6"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={data.name}
                                label="Nombre y Apellido"
                                disabled
                                className="mt-6"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={data.specialty}
                                label="Área o Especialidad"
                                disabled
                                className="mt-6"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={data.doctor}
                                label="Médico o Especialista"
                                disabled
                                className="mt-6"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={formatDate(date)}
                                onChange={(e) => setDate(new Date(e.target.value))}
                                label="Fecha (dd/mm/yy)"
                                type="date"
                                className="mt-6"
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <SelectField
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                label="Hora"
                                className="mt-6"
                            >
                                {generateTimeOptions()}
                            </SelectField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                label="Descripción"
                                className="mt-6"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={changeReason}
                                onChange={(e) => setChangeReason(e.target.value)}
                                label="Razón de cambio"
                                className="mt-6"
                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSubmitDialog} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
            );
};
