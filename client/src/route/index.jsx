import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import IntroSection from '../page/IntroSection';
import AboutSection from '../page/AboutSection';
import SkillSection from '../page/SkillSection';
import ProjectSection from '../page/ProjectSection';
import ContactSection from '../page/ContactSection';
import Home from '../page/Home';

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },

            {
                path: 'intro',
                element: <IntroSection />
            },

            {
                path: 'about',
                element: <AboutSection />
            },

            {
                path: 'skill',
                element: <SkillSection />
            },

            {
                path: 'project',
                element: <ProjectSection />
            },

            {
                path: 'contact',
                element: <ContactSection />
            }
        ]
    }
])