'use client'

import Link from 'next/link'
import { FormChangePassword } from '@/components/FormChangePassword';
import Menu from '@/components/Menu';


export default function ChangePassword() {
  return (

    <div>
      <Menu/>
      <FormChangePassword />
    </div>

  )
}