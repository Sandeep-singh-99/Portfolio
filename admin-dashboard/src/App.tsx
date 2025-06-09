import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import HeroSection from "./page/HeroSection";
import AboutSection from "./page/AboutSection";
import SkillSection from "./page/SkillSection";
import ProjectSection from "./page/ProjectSection";
import ContactSection from "./page/ContactSection";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="hero" element={<HeroSection />} />
          <Route path="about" element={<AboutSection />} />
          <Route path="skill" element={<SkillSection />} />
          <Route path="project" element={<ProjectSection />} />
          <Route path="contact" element={<ContactSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
