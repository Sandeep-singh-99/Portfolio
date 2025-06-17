import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "./components/NavBar";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100, 
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-950 to-black min-h-screen overflow-x-hidden text-white/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Navbar with fade-down animation */}
        <div data-aos="fade-down" data-aos-duration="2000">
          <NavBar />
        </div>

        {/* Main content with adjusted padding for fixed navbar */}
        <main className="pt-20 pb-12">
          <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}