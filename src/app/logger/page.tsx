'use client'

import { HeaderNiagara } from '@/components/HeaderNiagara'
import { Edit, Delete } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export default function EventLogger() {
  const [eventos, setEventos] = useState<any[]>([])

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/logger`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: null,
          },
        )
        const data = await response.json()
        setEventos(data)
      } catch (error) {
        console.log('an error ocurred fetching the logger')
        console.log(error)
      }
    }
    fetchEventos()
  }, [])

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro de eliminar el evento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/logger?id=${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: null,
          },
        )
        if (!response.ok) {
          const errorText = await response.text()
          console.log('an error ocurred deleting the event')
          console.log(errorText)
          return
        }
        Swal.fire('Evento eliminado', '', 'success')
        const newEventos = eventos.filter((evento) => evento.id !== id)
        setEventos(newEventos)
      } catch (error) {
        console.log('an error ocurred deleting the event')
        console.log(error)
      }
    }
  }

  return (
    <>
      <HeaderNiagara />
      <div>
        <h2 className="mb-4 text-center text-lg font-bold text-primary">
          LOGGER DE EVENTOS
        </h2>
        <table className="min-w-full divide-y divide-gray-200 border-4 border-gray-300">
          <thead className="bg-primary text-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Evento
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Módulo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Usuario
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Fecha
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Hora
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {eventos.map((evento) => (
              <tr key={evento.id}>
                <td className="whitespace-nowrap px-6 py-4">{evento.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{evento.action}</td>
                <td className="whitespace-nowrap px-6 py-4">{evento.description}</td>
                <td className="whitespace-nowrap px-6 py-4">{evento.user}</td>
                <td className="whitespace-nowrap px-6 py-4">{evento.date}</td>
                <td className="whitespace-nowrap px-6 py-4">{evento.time}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Edit className="mr-4" />
                  <button onClick={() => handleDelete(evento.id)}>
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
