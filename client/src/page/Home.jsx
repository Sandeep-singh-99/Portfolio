import React from 'react'
import IntroSection from './IntroSection'
import AboutSection from './AboutSection'
import SkillSection from './SkillSection'
import ProjectSection from './ProjectSection'
import ContactSection from './ContactSection'

export default function Home() {
  return (
    <main className="scroll-smooth">
      {/* Hero / Intro */}
      <section id="intro">
        <IntroSection />
      </section>

      {/* About */}
      <section id="about" >
        <AboutSection />
      </section>

      {/* Skills */}
      <section id="skills" >
        <SkillSection />
      </section>

      {/* Projects */}
      <section id="projects" >
        <ProjectSection />
      </section>

      {/* Contact */}
      <section id="contact" >
        <ContactSection />
      </section>
    </main>
  )
}
