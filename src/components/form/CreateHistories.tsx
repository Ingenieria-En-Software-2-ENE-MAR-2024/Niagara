import { useEffect, useState } from 'react'
import { components } from './FormItems'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../Button'
import { TextField } from '../Fields'

export default function History() {
    const { control, handleSubmit } = useForm()
    const [form, setForm] = useState({
        sections: [{
            title: '',
            questions: [{
                question: '',
                answer: [], // 'answer' es ahora un array de strings
                type: 'short-text'
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
                    answer: [],
                    type: 'short-text'
                }]
            }]
        })
    }

    const addQuestion = (sectionIndex: number, type: string) => {
        const newSections = [...form.sections]
        newSections[sectionIndex].questions.push({
            question: '',
            answer: [],
            type: type
        })
        setForm({...form, sections: newSections})
    }

    const changeQuestionType = (sectionIndex: number, questionIndex: number, newType: string) => {
        const newSections = [...form.sections]
        newSections[sectionIndex].questions[questionIndex].type = newType
        setForm({...form, sections: newSections})
    }
    

    const onSubmit = (form: any) => {
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
                    {section.questions.map((question, questionIndex) => {
                        // Selecciona el componente de entrada basado en el tipo de pregunta
                        const AnswerComponent = components[question.type] || TextField;

                        return (
                            <div key={questionIndex}>
                                <Controller
                                    name={`section-${sectionIndex}-question-${questionIndex}`}
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <TextField {...field} placeholder='Pregunta' />}
                                />
                                <Controller
                                    name={`section-${sectionIndex}-question-${questionIndex}-answer`}
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <AnswerComponent {...field} placeholder={['single-choice', 'single-select', 'multi-select'].includes(question.type) ? 'Separar las opciones con ,' : 'Respuesta'} />}
                                />
                                <select onChange={(e) => changeQuestionType(sectionIndex, questionIndex, e.target.value)}>
                                    <option value="short-text">Texto corto</option>
                                    <option value="long-text">Texto largo</option>
                                    <option value="single-choice">Selección simple</option>
                                    <option value="single-select">Selección única</option>
                                    <option value="multi-select">Selección múltiple</option>
                                </select>
                            </div>
                        );
                    })}
                    <Button type="button" onClick={() => addQuestion(sectionIndex, 'long-text')}>
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