// // import AOS from 'aos';
// // import 'aos/dist/aos.css'; 

// import { Outlet } from "react-router-dom";
// import NavBar from "./components/NavBar";

// // AOS.init();

// export default function App() {
//   return (
//     <div className="bg-gradient-to-r from-gray-950 to-gray-900 min-h-screen">
  
//         <NavBar/>
      
//     <Outlet/>
//     </div>
//   )
// }



import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavBar from './components/NavBar';

export default function App() {
  
  useEffect(() => {
    AOS.init({
      duration: 800, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-950 to-gray-900 min-h-screen overflow-x-hidden">
      {/* Floating Navbar with fade-down animation */}
      <div data-aos="fade-down">
        <NavBar />
      </div>

      {/* Main content with padding to account for fixed navbar */}
      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" data-aos-delay="200">
          <Outlet />
        </div>
      </main>
    </div>
  );
}