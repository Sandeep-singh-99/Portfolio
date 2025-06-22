const skills = [
  { name: "HTML", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Tailwind CSS", image: "https://www.svgrepo.com/show/374118/tailwind.svg" },
  { name: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

export default function SkillSection() {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center min-h-screen w-full "
      aria-label="Skills Section"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-center mb-8 sm:mb-10 md:mb-12"
        data-aos="fade-right"
        data-aos-delay="300"
      >
        My Skills
      </h2>
      <div
        className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-gray-700/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay={`${500 + index * 100}`}
          >
            <img
              src={skill.image}
              alt={`${skill.name} icon`}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain mb-3"
              loading="lazy"
            />
            <p className="text-sm sm:text-base md:text-lg text-gray-200 font-semibold text-center">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}