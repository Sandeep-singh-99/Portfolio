import React from 'react'
import DashboardHeader from '../../components/DashboardHeader'

export default function Dashboard() {
  return (
    <div className='h-screen bg-gradient-to-r from-gray-950 to-gray-700'>
        <DashboardHeader/>

        <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
    </div>
  )
}
