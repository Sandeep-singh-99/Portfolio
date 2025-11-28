import React from 'react'
import IntroPage from './intro/page'
import SkillPage from './skill/page'
import AboutPage from './about/page'
import ProjectPage from './project/page' 
import CertificatePage from './certificate/page'
import GithubPage from './github/page'
import BlogPage from './blog/page'


export default function Home() {
  return (
    <div className='py-10 space-y-10'>
      <IntroPage />
      <AboutPage />
      <SkillPage />
      <ProjectPage />
      <GithubPage />
      <CertificatePage />
      <BlogPage />
    </div>
  )
}
