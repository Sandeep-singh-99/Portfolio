'use client'

import Sidebar from '@/components/sidebar'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function MainLayout({ children } : { children: React.ReactNode }) {
  const login = usePathname()
  if (login === '/login') {
    return <>{children}</>
  }
  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}