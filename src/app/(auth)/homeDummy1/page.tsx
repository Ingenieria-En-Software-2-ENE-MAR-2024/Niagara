'use client'

import Link from 'next/link'


import { HeaderNiagara } from '@/components/HeaderNiagara'


export default function Home() {
    return (

        <>
            <HeaderNiagara/>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
                    <h1 className="text-6xl font-bold">
                        <span className="text-gray-700">Welcome User with dummy 1 permission!</span>
                    </h1>
                </main>

            </div>


        </>

    )
}

