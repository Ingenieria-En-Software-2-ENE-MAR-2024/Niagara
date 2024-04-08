import React from 'react'
import { Box, Typography } from '@mui/material'

export type Question = {
  type: string
  question: string
  section: string[]
  options: string[] | undefined
}

type TemplateProps = {
  items: Question[]
}

const OptionTypes: { [key: string]: string } = {
  TEXT: 'Texto',
  NUMBER: 'Número',
  DATE: 'Fecha',
  SIMPLE_SELECT: 'Selección Simple',
  MULTIPLE_SELECT: 'Selección Múltiple',
}

export const Template: React.FC<TemplateProps> = ({ items }) => {
  // Agrupar las preguntas por sección
  const sections: { [key: string]: Question[] } = items.reduce(
    (acc, item) => {
      const section = Array.isArray(item.section)
        ? item.section[0]
        : item.section
      ;(acc[section] = acc[section] || []).push(item)
      return acc
    },
    {} as { [key: string]: Question[] },
  )

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {Object.entries(sections).map(([section, questions], i) => (
        <Box
          key={i}
          sx={{
            borderRadius: '16px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            padding: '32px',
            margin: '20px',
            width: 'calc(50% - 40px)',
          }}
        >
          <Typography
            variant="h5"
            style={{ fontWeight: 'bold', marginTop: '16px' }}
          >
            {section}
          </Typography>
          {questions.map((question, j) => (
            <div key={j}>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', marginTop: '24px' }}
              >
                Pregunta: {question.question}
              </Typography>
              <Typography
                variant="body2"
                style={{ marginLeft: '20px', fontStyle: 'italic' }}
              >
                La pregunta es de tipo {OptionTypes[question.type]}
              </Typography>
              {question.options && (
                <Typography
                  variant="body2"
                  style={{ marginLeft: '20px', fontStyle: 'italic' }}
                >
                  Las opciones son: {question.options.join(', ')}
                </Typography>
              )}
            </div>
          ))}
        </Box>
      ))}
    </div>
  )
}
