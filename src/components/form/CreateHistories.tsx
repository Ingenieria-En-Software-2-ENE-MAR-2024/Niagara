'use client'
import { useEffect, useState } from 'react'
import { components } from './FormItems'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../Button'
import { SelectField } from '../Fields'

export default function History() {
    const { control, handleSubmit } = useForm()
    const [form, setForm] = useState({
        sections: [{
            title: '',
            questions: [{
                question: '',
                answer: ''
            }]
        }]
    })

    const addSection = () => {
        setForm({
            ...form,
            sections: [...form.sections, {
                title: '',
                questions: [{
                    question: '',
                    answer: ''
                }]
            }]
        })
    }

    const addQuestion = (sectionIndex) => {
        const newSections = [...form.sections]
        newSections[sectionIndex].questions.push({
            question: '',
            answer: ''
        })
        setForm({...form, sections: newSections})
    }

    const onSubmit = form => {
        console.log(form)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {form.sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    <Controller
                        name={`section-${sectionIndex}`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} type='text' placeholder='Título de la sección' />}
                    />
                    {section.questions.map((question, questionIndex) => (
                        <div key={questionIndex}>
                            <Controller
                                name={`section-${sectionIndex}-question-${questionIndex}`}
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field} type='text' placeholder='Pregunta' />}
                            />
                            <Controller
                                name={`section-${sectionIndex}-question-${questionIndex}-answer`}
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field} type='text' placeholder='Respuesta' />}
                            />
                        </div>
                    ))}
                    <Button type="button" onClick={() => addQuestion(sectionIndex)}>
                        Agregar Pregunta
                    </Button>
                </div>
            ))}
            <Button type="button" onClick={addSection}>
                Agregar Sección
            </Button>
            <Button type="submit">
                Enviar
            </Button>
        </form>
    )
}