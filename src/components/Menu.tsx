'use client'

import React from 'react'
import NavigationMenu from '@/components/NavigationMenu'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'

type MenuItem = {
  title: string
  link?: string
  subMenuItems?: {
    title: string
    link: string
  }[]
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession()
      const userRole = session?.user.role

      let items: MenuItem[] = [
        // {
        //   title: 'Perfil',
        //   subMenuItems: [
        //     { title: 'Ver Perfil', link: '/profile'},
        //     { title: 'Cambio de contraseña', link: '/changePassword' },
        //   ],
        // },
      ]

      if (userRole === 'Medic') {
        items.push(
          {
            title: 'Perfil',
            subMenuItems: [
              { title: 'Ver Perfil', link: '/profile' },
              { title: 'Cambio de contraseña', link: '/changePassword' },
            ],
          },
          {
            title: 'Calendario Médico',
            link: '/medicalCalendar',
          },
        )
      } else if (userRole === 'Patient') {
        items.push(
          {
            title: 'Perfil',
            subMenuItems: [
              { title: 'Ver Perfil', link: '/profile' },
              { title: 'Cambio de contraseña', link: '/changePassword' },
            ],
          },
          {
            title: 'Gestión de Citas',
            link: '/appointments',
          },
        )
      } else if (userRole === 'admin') {
        items.push(
          {
            title: 'Historia Clínica',
            link: '/medicalHistory',
          },
        )
      }

      setMenuItems(items)
    }

    fetchSession()
  }, [])

  return (
    <div>
      <NavigationMenu menuItems={menuItems} />
    </div>
  )
}

export default Menu
