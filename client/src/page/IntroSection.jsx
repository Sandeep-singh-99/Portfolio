import img1 from "../assets/profile.jpg";

export default function IntroSection() {
  return (
    <section
      className="flex flex-col md:flex-row items-center justify-between min-h-screen px-4 sm:px-6 md:px-10 lg:px-10 max-w-screen mx-auto"
      aria-label="Introduction Section"
    >
      {/* Text Content */}
      <div
        className="flex flex-col items-center md:items-start text-center md:text-left space-y-5 md:space-y-7 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl order-2 md:order-1 mt-8 md:mt-0"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Hi, I'm
          </h1>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Sandeep Singh
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200">
          Web Developer
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-prose tracking-wider">
          I'm a passionate web developer specializing in crafting dynamic,
          responsive web applications. I thrive on exploring cutting-edge
          technologies to deliver exceptional user experiences.
        </p>
        {/* <button className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-black to-gray-800 text-white font-medium rounded-lg hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 text-sm sm:text-base">
          Resume
        </button> */}
        <button className="relative px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-500/50 active:scale-95 overflow-hidden group">
          <span className="relative z-10">Resume</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </button>
      </div>

      {/* Profile Image */}
      <div
        className="order-1 md:order-2 relative"
        data-aos="fade-left"
        data-aos-delay="400"
      >
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-2xl shadow-blue-900/50 hover:shadow-blue-900/70 transition-shadow duration-300">
          <img
            src={img1}
            alt="Sandeep Singh's Profile"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
