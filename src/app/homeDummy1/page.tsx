'use client'

import Menu from '@/components/Menu'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <>
      <Menu />
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-6xl font-bold">
            <span className="text-gray-700">
            ¡Bienvenido Usuario con permiso de Doctor!
            </span>
          </h1>
        </main>
      </div>
    </>
  )
}
