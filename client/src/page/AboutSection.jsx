export default function AboutSection() {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16"
      aria-label="About Section"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-center"
        data-aos="fade-right"
        data-aos-delay="300"
      >
        About Me
      </h2>
      <p
        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed text-center max-w-prose"
        data-aos="fade-left"
        data-aos-delay="400"
      >
        I'm a passionate web developer with a keen interest in crafting dynamic and responsive web applications. I thrive on exploring cutting-edge technologies and continuously honing my skills to deliver exceptional user experiences.
      </p>
    </section>
  );
}