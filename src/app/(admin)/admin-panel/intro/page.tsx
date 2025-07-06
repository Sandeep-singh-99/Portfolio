import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import IntroForm from "./_components/introFrom";
import { ConnectDB } from "../../../../../lib/db";
import Intro from "../../../../../models/intro.model";
import Image from "next/image";
import { FileText  } from "lucide-react";
import DeleteIntro from "./_components/deleteIntro";

async function fetchIntroFromDB() {
  await ConnectDB();
  const data = await Intro.find().sort({ createdAt: -1 });
  return data;
}

export default async function IntroPage() {
  const introData = await fetchIntroFromDB();


  return (
    <section className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Intro Section
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage the hero content of your portfolio with ease.
          </p>
        </div>
        <IntroForm />
      </div>

      {/* Preview Card */}
      <Card className="shadow-lg rounded-xl">
        <CardContent className="p-6 sm:p-4">
          <h2 className="text-2xl font-semibold mb-3">Preview</h2>

          {introData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No intro data available.</p>
              <p className="text-gray-400 text-sm mt-2">
                Add new content using the form above to get started.
              </p>
            </div>
          ) : (
            <ul className="grid gap-6">
              {introData.map((intro) => (
                <li
                  key={intro._id}
                  className="p-6 rounded-lg border  hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="grid gap-4 sm:grid-cols-3 flex-1">
                      {/* Text Content */}
                      <div className="sm:col-span-2 space-y-3">
                        <p className="text-sm">
                          <span className="font-semibold">Name:</span>{" "}
                          <span>{intro.name}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Tech Stack:</span>{" "}
                          <span>
                            {intro.techStack.join(", ")}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Description:</span>{" "}
                          <span>{intro.desc}</span>
                        </p>
                      </div>

                      {/* Image and File Section */}
                      <div className="space-y-4">
                        {/* Image Preview */}
                        <div>
                          <span className="font-semibold text-sm">
                            Image:
                          </span>
                          {intro.image ? (
                            <div className="mt-2">
                              <Image
                                width={120}
                                height={120}
                                src={intro.image}
                                alt={`${intro.name}'s profile image`}
                                className="w-32 h-32 object-cover rounded-lg shadow-sm"
                              />
                            </div>
                          ) : (
                            <p className="text-sm mt-2 italic">
                              No image provided
                            </p>
                          )}
                        </div>

                        {/* File Preview */}
                        <div>
                          <span className="font-semibold text-sm">
                            File:
                          </span>
                          {intro.file ? (
                            intro.file.endsWith(".pdf") ? (
                              <div className="mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  asChild
                                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                                >
                                  <a
                                    href={intro.file}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <FileText className="w-4 h-4" />
                                    Download PDF
                                  </a>
                                </Button>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 mt-2 italic">
                                No file preview available
                              </p>
                            )
                          ) : (
                            <p className="text-sm text-gray-500 mt-2 italic">
                              No file provided
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    {/* <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-2 hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button> */}
                    <DeleteIntro id={intro.id} />
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