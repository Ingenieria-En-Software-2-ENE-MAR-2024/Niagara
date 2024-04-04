import React, { useState, useRef, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { getSession } from 'next-auth/react'

interface MenuItem {
  title: string
  link?: string
  subMenuItems?: MenuItem[]
}

interface NavigationMenuProps {
  menuItems: MenuItem[]
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ menuItems }) => {
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [userRole, setUserRole] = useState<string | null>(null)

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenSubMenuIndex(null)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession()
      setUserRole(session?.user?.role || null)
    }
    fetchSession()
  }, [])

  const getHomeRoute = () => {
    switch (userRole) {
      case 'Patient':
        return '/niagarahome'
      case 'Medic':
        return '/homeMedic'
      case 'admin':
        return '/admin'
      default:
        return '/'
    }
  }

  const renderSubMenu = (subMenuItems: MenuItem[], parentIndex: number) => {
    return (
      <div className="absolute z-10 -ml-4 mt-1 w-48 rounded-lg bg-white shadow-lg">
        {subMenuItems.map((subMenuItem, subIndex) => (
          <div key={subIndex}>
            {subMenuItem.subMenuItems ? (
              <>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSubMenuToggle(parentIndex)}
                >
                  {subMenuItem.title}
                  <svg
                    className="ml-2 inline-block h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      transition: 'transform 0.3s',
                      transform:
                        openSubMenuIndex === parentIndex
                          ? 'rotate(0deg)'
                          : 'rotate(180deg)',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={
                        openSubMenuIndex === parentIndex
                          ? 'M19 9l-7 7-7-7'
                          : 'M5 15l7-7 7 7'
                      }
                    />
                  </svg>
                </button>
                {openSubMenuIndex === parentIndex &&
                  renderSubMenu(subMenuItem.subMenuItems, parentIndex)}
              </>
            ) : (
              <a
                href={subMenuItem.link ? subMenuItem.link : '#'}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {subMenuItem.title}
              </a>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <nav className="bg-tertiary" ref={menuRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href={getHomeRoute()} aria-label="Home">
                <h1 className="mb-5 mt-5 text-2xl font-bold text-white">
                  Niagara
                </h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((menuItem, index) => (
                  <div key={index} className="relative">
                    {menuItem.subMenuItems ? (
                      <>
                        <button
                          className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                          onClick={() => handleSubMenuToggle(index)}
                        >
                          {menuItem.title}
                          <svg
                            className="ml-2 inline-block h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style={{
                              transition: 'transform 0.3s',
                              transform:
                                openSubMenuIndex === index
                                  ? 'rotate(0deg)'
                                  : 'rotate(180deg)',
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={
                                openSubMenuIndex === index
                                  ? 'M19 9l-7 7-7-7'
                                  : 'M5 15l7-7 7 7'
                              }
                            />
                          </svg>
                        </button>
                        {openSubMenuIndex === index &&
                          renderSubMenu(menuItem.subMenuItems, index)}
                      </>
                    ) : (
                      <a
                        href={menuItem.link ? menuItem.link : '#'}
                        className="rounded-md bg-primary px-3 py-3 text-sm font-medium text-white hover:bg-gray-700"
                      >
                        {menuItem.title}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            className="rounded-md bg-primary px-3 py-3 text-sm font-medium text-white hover:bg-gray-700"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default NavigationMenu
