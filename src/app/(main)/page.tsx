import React from 'react'
import IntroPage from './intro/page'
import AboutPage from './about/page'
import ContactPage from './contact/page'
import SkillPage from './skill/page'
import ProjectPage from './project/page'


export default function HomePage() {
  return (
    <section className=''>
      <IntroPage />
      <AboutPage />
      <SkillPage />
      <ProjectPage />
      <ContactPage />
    </section>
  )
}
