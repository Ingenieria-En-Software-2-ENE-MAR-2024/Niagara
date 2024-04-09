'use client'

import React, { useState } from 'react' 
import Menu from '@/components/Menu'
import EditHistory from '@/components/form/EditHistories'


export default function EditMedicalHistoryPage() {

  return (
    <>
      <Menu />
      <div className="flex w-full flex-col items-center justify-center py-2">
        <h1 className="text-2xl font-bold">Historia Clínica</h1>
        <div className="mx-auto mt-4 w-full max-w-5xl">
          
          <EditHistory />
        
        </div>
      </div>
    </>
  )
}
