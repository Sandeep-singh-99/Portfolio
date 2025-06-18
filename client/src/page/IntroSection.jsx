import img1 from "../assets/profile.jpg";

export default function IntroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 max-w-screen-xl mx-auto">
      <div className="flex flex-col items-center md:items-start justify-center space-y-4 md:space-y-6 max-w-full md:max-w-2xl text-center md:text-left">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Hi, I am
          </h1>
          <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Sandeep Singh
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Web Developer
        </h1>
        <p className="text-sm md:text-base">
          I am a passionate web developer with a keen interest in creating
          dynamic and responsive web applications. I love to explore new
          technologies and continuously improve my skills to deliver the best
          user experience.
        </p>
        <button className="px-4 py-2 md:px-6 md:py-3 bg-black/50 backdrop-blur-sm text-white border border-white/20 rounded-xl hover:bg-black/70 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 text-sm md:text-base">
          Contact Me
        </button>
      </div>

      <div className="mt-8 md:mt-0 md:ml-8">
        <img
          src={img1}
          alt="Profile"
          className="rounded-full w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover border border-gray-300 shadow-2xl shadow-gray-800"
        />
      </div>
    </div>
  );
}
