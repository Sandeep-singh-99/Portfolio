import React from 'react'
import IntroSection from './IntroSection'
import AboutSection from './AboutSection'
import SkillSection from './SkillSection'
import ProjectSection from './ProjectSection'
import ContactSection from './ContactSection'

export default function Home() {
  return (
    <section>
        <IntroSection/>
        <AboutSection/>
        <SkillSection/>
        <ProjectSection/>
        <ContactSection/>
    </section>
  )
}
