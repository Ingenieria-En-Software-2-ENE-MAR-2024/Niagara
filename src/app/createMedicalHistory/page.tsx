'use client'

import Menu from '@/components/Menu'
import Histories from '@/components/form/CreateHistories'

export default function CreateMedicalHistoryPage() {
  return (
    <>
      <Menu />
      <div className="flex w-full flex-col items-center justify-center py-2">
        <h1 className="text-2xl font-bold">Historia Clínica</h1>
        <div className="mx-auto mt-4 w-full max-w-2xl">
          <Histories />
        </div>
      </div>
    </>
  )
}
