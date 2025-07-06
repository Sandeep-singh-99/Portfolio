import { Card, CardContent } from "@/components/ui/card";
import IntroForm from "./_components/introFrom";
import { ConnectDB } from "../../../../../lib/db";
import Intro from "../../../../../models/intro.model";
import Image from "next/image";

async function fetchIntroFromDB() {
  await ConnectDB();
  const data = await Intro.find().sort({ createdAt: -1 });
  // return JSON.parse(JSON.stringify(data));
  return data;
}

export default async function IntroPage() {
  const introData = await fetchIntroFromDB();

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Intro Section</h1>
          <p className="text-gray-600 mt-1">
            This section controls the hero content of your portfolio.
          </p>
        </div>
        <IntroForm />
      </div>

      {/* <main>
        <Card className="p-6">
          <CardContent>
            <h2 className="text-xl font-bold">Preview</h2>
            {introData.length === 0 ? (
              <p className="text-gray-600">No intro data available.</p>
            ) : (
              <ul className="space-y-4">
                {introData.map((intro) => (
                  <li key={intro._id} className="border-b pb-2">
                    <p><strong>Name:</strong> {intro.name}</p>
                    <p><strong>Tech Stack:</strong> {intro.techStack.join(", ")}</p>
                    <p><strong>Description:</strong> {intro.desc}</p>
                    <p><strong>Image:</strong> <a href={intro.image}>View</a></p>
                    <p><strong>File:</strong> <a href={intro.file}>View</a></p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main> */}

      {/* Preview Card */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Preview</h2>

          {introData.length === 0 ? (
            <p className="text-muted-foreground">No intro data available.</p>
          ) : (
            <ul className="space-y-6">
              {introData.map((intro) => (
                <li key={intro._id} className="border-b pb-4 space-y-1">
                  <p>
                    <span className="font-medium">Name:</span> {intro.name}
                  </p>
                  <p>
                    <span className="font-medium">Tech Stack:</span>{" "}
                    {intro.techStack.join(", ")}
                  </p>
                  <p>
                    <span className="font-medium">Description:</span>{" "}
                    {intro.desc}
                  </p>
                  <div>
                    <span className="font-medium">Image:</span>
                    {intro.image ? (
                      <div className="mt-2">
                        <Image
                          width={160}
                          height={160}
                          src={intro.image}
                          alt="Uploaded Image"
                          className="w-40 h-40 object-cover rounded border"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">
                        No image provided
                      </p>
                    )}
                  </div>

                  <div>
                    <span className="font-medium">File:</span>
                    {intro.file ? (
                      intro.file.endsWith(".pdf") ? (
                        <div className="mt-2">
                          <a
                            href={intro.file}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Download File
                          </a>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <p>No file preview available</p>
                        </div>
                      )
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">
                        No file provided
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
