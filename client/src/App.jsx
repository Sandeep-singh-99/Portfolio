
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import AOS from "aos";
import "aos/dist/aos.css"; 
import SocialSection from "./components/SocialSection";


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
        <div data-aos="fade-down" data-aos-duration="2000">
          <NavBar />
        </div>

        <SocialSection />
        <main className="pt-20 pb-12">
          <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
