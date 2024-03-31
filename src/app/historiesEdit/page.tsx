'use client'

import { HeaderNiagara } from '@/components/HeaderNiagara'
import Form from '@/components/form/Form'
import Histories from '@/components/form/CreateHistories'

export default function HistoriesEditPage() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <h1>Aqui esta lo de nestor</h1>
        <Form/>
        <h1>Aqui esta lo nuevo</h1>
        <Histories/>
      </div>
    </>
  )
}
