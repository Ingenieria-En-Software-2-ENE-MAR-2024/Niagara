import { HeaderNiagara } from '@/components/HeaderNiagara'
import { Edit, Delete } from '@mui/icons-material'
import React from 'react';

export default function EventLogger() {
  const eventos = [
    {
      id: 1,
      evento: 'Agregar',
      modulo: 'Perfiles',
      usuario: 'Usuario 1',
      fecha: '30/01/20',
      hora: '11:30am',
    },
    {
      id: 2,
      evento: 'Eliminar',
      modulo: 'Pacientes',
      usuario: 'Usuario 2',
      fecha: '31/01/20',
      hora: '5:01pm',
    },
    {
      id: 3,
      evento: 'Modificar',
      modulo: 'Perfiles',
      usuario: 'Usuario 3',
      fecha: '01/02/20',
      hora: '4:00pm',
    },
  ];

  return (
    <>
      <HeaderNiagara />
      <div>
        <h2 className="text-lg text-center font-bold mb-4 text-primary">LOGGER DE EVENTOS</h2>
        <table className="min-w-full divide-y divide-gray-200 border-4 border-gray-300"> 
          <thead className="bg-primary text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Evento
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Módulo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Hora
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {eventos.map(evento => (
              <tr key={evento.id}>
                <td className="px-6 py-4 whitespace-nowrap">{evento.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evento.evento}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evento.modulo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evento.usuario}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evento.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evento.hora}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Edit className="mr-4" /> 
                  <Delete />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
