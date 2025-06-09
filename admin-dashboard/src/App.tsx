import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import HeroSection from "./page/HeroSection";
import AboutSection from "./page/AboutSection";
import SkillSection from "./page/SkillSection";
import ProjectSection from "./page/ProjectSection";
import ContactSection from "./page/ContactSection";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import { useAuthStore } from "./store/useAuthStore";
import { useQuery } from "@apollo/client";
import { CHECK_AUTH } from "./graphql/queries";
import { useEffect } from "react";
import ProtectedRoute from "./components/protectedRoutes";

export default function App() {

  const { checkAuth, user, getUser } = useAuthStore();

  const { data, loading } = useQuery(CHECK_AUTH, {
    fetchPolicy: "no-cache",
    onError: (err) => {
      console.error("Error fetching auth data:", err);
    },
  });

  useEffect(() => {
    if (data?.checkAuth) {
      checkAuth(data.checkAuth);
      console.log("User authenticated:", data.checkAuth);
      console.log("User ID:", user);
      getUser();
    }
  }, [data, checkAuth]);

   if (loading) {
    return <div>Loading authentication...</div>;
  }

  if (!user) {
    return <div>Unauthorized access. Please log in.</div>;
  }

 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={ <ProtectedRoute> <Home /> </ProtectedRoute> }>
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
