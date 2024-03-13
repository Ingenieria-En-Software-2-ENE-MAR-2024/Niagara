'use client'

import { HeaderNiagara } from '@/components/HeaderNiagara'
import  MedicalAppointmetForm  from '@/components/medicalAppointment/MedicalAppointmetForm'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <>
      <HeaderNiagara />
      <MedicalAppointmetForm/>
    </>
  )
}
