import Image from 'next/image'
import React from 'react'
import ContactForm from './_components/contact-form'

export default function ContactPage() {
  return (
    <div className='flex items-center md:justify-between min-h-screen '>
       <div className='hidden md:block'>
        <Image src={"/contact.svg"} alt='contact' width={500} height={500} />
       </div>

       <div className='flex flex-col items-center justify-center w-full max-w-xl'>
       <ContactForm />
        </div>
    </div>
  )
}
