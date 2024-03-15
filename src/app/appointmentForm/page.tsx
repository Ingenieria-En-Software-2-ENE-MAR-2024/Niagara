'use client'

import Menu  from '@/components/Menu'
import  MedicalAppointmetForm  from '@/components/medicalAppointment/MedicalAppointmetForm'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <>
      <Menu />
      <MedicalAppointmetForm/>
    </>
  )
}
