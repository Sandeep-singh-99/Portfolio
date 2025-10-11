import React from 'react'
import IntroPage from './intro/page'
import AboutPage from './about/page'
import ContactPage from './contact/page'
import SkillPage from './skill/page'
import ProjectPage from './project/page'
import { AuroraLayout } from '@/components/auroralayout'

// max-w-5xl mx-auto px-1 sm:px-6 lg:px-12
export default function HomePage() {
  return (
    <AuroraLayout>
     <div className="">
       <IntroPage />
      <AboutPage />
      <SkillPage />
      <ProjectPage />
      <ContactPage />
     </div>
    </AuroraLayout>
  )
}

 