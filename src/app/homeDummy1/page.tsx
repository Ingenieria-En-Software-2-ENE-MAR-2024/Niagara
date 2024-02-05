'use client'

import { HeaderNiagara } from '@/components/HeaderNiagara'
import { getSession } from 'next-auth/react'

export default async function Home() {
  console.log(await getSession())
  return (
    <>
      <HeaderNiagara />
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-6xl font-bold">
            <span className="text-gray-700">
              Welcome User with Admin permission!
            </span>
          </h1>
        </main>
      </div>
    </>
  )
}
