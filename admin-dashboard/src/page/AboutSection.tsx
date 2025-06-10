import { AboutSectionForm } from "@/components/about/AboutSectionForm";



export default function AboutSection() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">About Section</h1>
          <p className="mt-2 text-gray-600">
            This is the about section of the admin dashboard.
          </p>
        </div>
        {/* <Button variant={"default"}>Create About Section</Button> */}
        <AboutSectionForm/>
      </div>

      <div className="border border-gray-800 dark:border-gray-700 my-5"></div>

      <section>
        <h2 className="text-xl font-bold">About Content</h2>
        <p className="mt-2 text-gray-600">
          This is the content area for the about section.
        </p>
      </section>
    </div>
  )
}
