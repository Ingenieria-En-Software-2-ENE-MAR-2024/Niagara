'use client'

import React, { useEffect, useState } from 'react'
import { SelectField } from '@/components/Fields'
import { Button } from '@/components/Button'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Tabs,
    Tab,
    Checkbox,
    FormControlLabel,
    TextField,
    TabScrollButton
} from '@mui/material'
import { getSession } from 'next-auth/react'


async function fetchData(id: any, token: any, setFormData: any, setOpen: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/medicalHistory/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'access-token': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('ClinicHistory could not be retrieved');
        }

        console.log('ClinicHistory model successfully retrieved');
        const data = await response.json();
        setFormData(data);
    } catch (error) {
        console.error('An error occurred while retrieving the Clinic History:', error);
        setOpen(false);
    }
}

export interface Question {
    question: string;
    type: string;
    options: string | null;
    result?: string;
}

export interface Section {
    title: string;
    questions: Question[];
}

interface ModalUserProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    edit: boolean
    id: number
    onChange: any
}

export const FormEditClinicHistory: React.FC<ModalUserProps> = ({
    open,
    setOpen,
    edit,
    id,
    onChange = undefined,
}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState<Section[]>([]);

    const [token, setToken] = useState<any>(null)

    const handleChange = (sectionIndex: number, questionIndex: number, newValue: string | boolean) => {
        const updatedFormData = [...formData]
        updatedFormData[sectionIndex].questions[questionIndex].result = newValue.toString()
        setFormData(updatedFormData)
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    };

    const handleSubmitDialog = async () => {
        // if (time === '' || description === '') {
        //     console.log('Faltaron datos.')
        //     return
        // }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/clinicHistory/${id}`,
                {
                    method: edit ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                },
            )

            if (!response.ok) {
                // console.log(response)
                console.log('ClinicHistory could not be edited')
                return
            }
            console.log('ClinicHistory edited')
            if (onChange != undefined) onChange()
        } catch (e) {
            console.log('An error ocurred editing the Clinic History')
            return
        } finally {
            setOpen(false)
        }
    }

    useEffect(() => {
        getSession().then((result) => {
            setToken(result?.user?.accessToken);
        });

        fetchData(id, token, setFormData, setOpen);
    }, [id, token]); // Add dependencies

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
                    {'Edición de historia clínica'}
                </DialogTitle>

                <DialogContent>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                    >
                        {formData.map((section, index) => (
                            <Tab key={index} label={section.title} />
                        ))}
                    </Tabs>
                    <div>
                        {formData[activeTab].questions.map((question, questionIndex) => (
                            <div key={questionIndex} style={{ marginTop: '16px' }}>
                                {question.type === 'short-text' && (
                                    <TextField
                                        label={question.question}
                                        value={question.result || ''}
                                        onChange={(e) => handleChange(activeTab, questionIndex, e.target.value)}
                                        fullWidth
                                        margin="normal"
                                        disabled={!edit}
                                    />
                                )}
                                {question.type === 'multiple-choice' && (
                                    <>
                                        <div>{question.question}</div>
                                        {question.options?.split(',').map((option, optionIndex) => (
                                            <FormControlLabel
                                                key={optionIndex}
                                                control={
                                                    <Checkbox
                                                        checked={question.result ? question.result.split(',').includes(option) : false}
                                                        onChange={(e) => {
                                                            const newOptions = question.result ? question.result.split(',') : [];
                                                            if (e.target.checked) {
                                                                newOptions.push(option);
                                                            } else {
                                                                const index = newOptions.indexOf(option);
                                                                if (index !== -1) {
                                                                    newOptions.splice(index, 1);
                                                                }
                                                            }
                                                            handleChange(activeTab, questionIndex, newOptions.join(','));
                                                        }}
                                                        disabled={!edit}
                                                    />
                                                }
                                                style={{ margin: '5px 0' }}
                                                label={option.trim()}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} style={{ backgroundColor: 'red', color: 'white' }}>Cerrar</Button>
                    <Button onClick={handleSubmitDialog} style={{ backgroundColor: 'green', color: 'white' }}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
