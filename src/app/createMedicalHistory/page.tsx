'use client'

import React, { useState } from 'react' 
import Menu from '@/components/Menu'
import History from '@/components/form/CreateHistories'


export default function CreateMedicalHistoryPage() {

  return (
    <>
      <Menu />
      <div className="flex w-full flex-col items-center justify-center py-2">
        <h1 className="text-2xl font-bold">Historia Clínica</h1>
        <div className="mx-auto mt-4 w-full max-w-5xl">
          
          <History />
        
        </div>
      </div>
    </>
  )
}
