import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import IntroSection from "./page/IntroSection";
import AboutSection from "./page/AboutSection";
import SkillSection from "./page/SkillSection";
import ProjectSection from "./page/ProjectSection";
import ContactSection from "./page/ContactSection";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";


export default function App() {
  const { checkAuth, user } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Error during authentication check:', error);
      }
    };
    verifyAuth();
  }, [checkAuth]);

 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <Home/> : <Navigate to="/login" />}>
          {/* Nested routes for the main sections of the home page */}
          <Route index element={<Dashboard />} />
          <Route path="intro" element={<IntroSection />} />
          <Route path="about" element={<AboutSection />} />
          <Route path="skill" element={<SkillSection />} />
          <Route path="project" element={<ProjectSection />} />
          <Route path="contact" element={<ContactSection />} />
        </Route>
      </Routes>
       {/* <Toaster /> */}
    </BrowserRouter>
  );
}
