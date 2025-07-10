import React from 'react'
import IntroPage from './intro/page'
import AboutPage from './about/page'

export default function Home() {
  return (
    <section className=''>
      <IntroPage/>
      <AboutPage/>
    </section>
  )
}
