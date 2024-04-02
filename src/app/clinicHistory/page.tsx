'use client'

import React from 'react';

interface Question {
  question: string;
  answer: string | number;
}

interface HistoryProps {
  data: {
    patient_id: number;
    questionary_id: number;
    QuestionsAnwsers1: Question[];
    QuestionsAnwsers2: Question[];
  };
}


const History: React.FC<HistoryProps> = () => {

    const data = {
        "patient_id": 2,
        "questionary_id": 1,
        "QuestionsAnwsers1": [ 
          {
            "question": "Nombre completo",
            "answer" : "Pepe"
          },
          {
            "question": "Sexo",
            "answer" :  "Masculino"
          },
          {
            "question": "Edad",
            "answer" : 25
          },
          {
            "question": "Fecha de Nacimiento",
            "answer": "1998-01-01"
          },
          {
            "question": "Dirección",
            "answer": "Calle Principal #123"
          },
          {
            "question": "Teléfono",
            "answer": "123-456-7890"
          },
          {
            "question": "Correo Electrónico",
            "answer": "example@example.com"
          },
          {
            "question": "Nombre del Contacto de Emergencia",
            "answer": "Juan"
          },
          {
            "question": "Teléfono del Contacto de Emergencia",
            "answer": "987-654-3210"
          }
        ],
        "QuestionsAnwsers2": [ 
            {
              "question": "Fecha de inicio",
              "answer" : "2023-12-15"
            },
            {
              "question": "Evolución",
              "answer" :  "Mejorando gradualmente"
            },
            {
              "question": "Sintomas",
              "answer" : "Dolor de cabeza"
            },
            {
              "question": "Signos",
              "answer": "Presión arterial alta"
            },
            {
              "question": "Factores que agravan/mejoran los sintomas",
              "answer": "El estrés agrava los síntomas"
            },
            {
              "question": "Tratamientos previos",
              "answer": "Analgésicos y descanso"
            },
          ]
    };
    

    return (
        <div className="max-w-lg mx-auto mt-10">
          <h1 className="text-3xl font-semibold mb-6 text-center text-primary">Historia Clínica</h1>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl text-center font-semibold mb-2">Datos Personales</h2>
              <div className="flex flex-wrap justify-between">
                {data &&
                  data.QuestionsAnwsers1 &&
                  data.QuestionsAnwsers1.map((item, index) => (
                    <div key={index} className="mb-4 flex justify-between items-center w-full">
                      <p className="text-lg font-semibold mb-0">{item.question}:</p>
                      <p className="mb-0">{item.answer}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
            <div className="p-4 border-b">
              <h2 className="text-xl text-center font-semibold mb-2">Enfermedad actual</h2>
              <div className="flex flex-wrap justify-between">
                {data &&
                  data.QuestionsAnwsers2 &&
                  data.QuestionsAnwsers2.map((item, index) => (
                    <div key={index} className="mb-4 flex justify-between items-center w-full">
                      <p className="text-lg font-semibold mb-0">{item.question}:</p>
                      <p className="mb-0">{item.answer}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      );
      
      
};

export default History;
