import { IntroSectionForm } from "@/components/intro/IntroSectionForm";

export default function HeroSection() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Intro Section</h1>
          <p className="mt-2 text-gray-600">
            This is the intro section of the admin dashboard.
          </p>
        </div>
        {/* <Button variant={"default"}>Create Intro Section</Button> */}
        <IntroSectionForm/>
      </div>

      <div className="border border-gray-800 dark:border-gray-700 my-5"></div>

      <section>
        <h2 className="text-xl font-bold">Hero Content</h2>
        <p className="mt-2 text-gray-600">
          This is the content area for the hero section.
        </p>
      </section>
    </div>
  );
}
