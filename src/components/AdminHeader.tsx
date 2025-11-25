import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { ModeToggle } from './ModeToggle'

export default function AdminHeader() {
  return (
    <div className='p-4 flex justify-between items-center'>
        <SidebarTrigger />

        <ModeToggle />
    </div>
  )
}
