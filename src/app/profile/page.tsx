'use client'

import React, { useState, useEffect } from 'react'
import { PacientProfile } from '@/components/profiles/Pacient'
import { MedicProfile } from '@/components/profiles/Medic'
import Menu from '@/components/Menu'
import { getSession } from 'next-auth/react'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export default function Profile() {
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [ci, setCi] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession()
        console.log(session)
        const userId = session?.user?.id
        setRole(session?.user?.role as string)
        setName(session?.user?.name as string)
        setEmail(session?.user?.email as string)
				setCi(session?.user?.ci as string)

        const response = await fetch(
          `${baseUrl}/api/profile/${String(userId)}`,
          {
            method: 'GET',
            headers: {
              'access-token': `Bearer ${session?.user.accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )

        console.log(response)

        if (!response.ok) {
          console.log('an error ocurred fetching the profile data')
          return
        }
      } catch (e) {
        return
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <Menu />
      {role === 'Patient' ? (
        <PacientProfile user={{ name, ci, email }} />
      ) : role === 'Medic' ? (
        <MedicProfile user={{ name, ci, email }} />
      ) : null}
    </div>
  )
}
