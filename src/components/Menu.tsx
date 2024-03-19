'use client'

import React from 'react'
import NavigationMenu from '@/components/NavigationMenu'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'

type MenuItem = {
  title: string
  subMenuItems: {
    title: string
    link: string
  }[]
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession()
      const userRole = session?.user?.role

      let items: MenuItem[] = [
        {
          title: 'Configuración',
          subMenuItems: [
            { title: 'Cambio de contraseña', link: '/changePassword' },
          ],
        },
      ]

      if (userRole === 'Medic') {
        items.push({
          title: 'Calendario Médico',
          subMenuItems: [
            { title: 'Calendario Médico', link: '/medicalCalendar' },
          ],
        })
      } else if (userRole === 'Patient') {
        items.push({
          title: 'Gestión de Citas',
          subMenuItems: [{ title: 'Gestión de Citas', link: '/appointments' }],
        })
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
