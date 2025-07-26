import React from 'react'
import IntroPage from './intro/page'
import AboutPage from './about/page'
import ContactPage from './contact/page'
import SkillPage from './skill/page'
import ProjectPage from './project/page'
import { AuroraLayout } from '@/components/auroralayout'


export default function HomePage() {
  return (
    <>
      <IntroPage />
      <AboutPage />
      <SkillPage />
      <ProjectPage />
      <ContactPage />
    </>
  )
}
