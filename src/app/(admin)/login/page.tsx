import Image from 'next/image'
import React from 'react'

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-between'>
      <div className='flex items-center justify-center space-x-10 h-screen'>
         <div>
        <Image
          src='login.svg'
          alt='Admin Login'
          width={250}
          height={500}
          className='mx-auto mt-10'
        />
      </div>

      <div>
        <h1 className='text-3xl font-bold text-center mt-10'>Admin Login</h1>
      </div>
      </div>
    </div>
  )
}
