'use client'

import { HeaderNiagara } from '@/components/HeaderNiagara'
import { redirect, useParams } from 'next/navigation'

export default function Home() {
  redirect(new URL('/login', process.env.NEXTAUTH_URL).pathname);
}
