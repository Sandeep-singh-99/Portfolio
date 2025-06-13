import { IntroSectionForm } from "@/components/intro/IntroSectionForm";
import { Button } from "@/components/ui/button";
import { DELETE_INTRO } from "@/graphql/mutation";
import { GET_INTRO } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";

interface IIntroProps {
  _id: string; 
  name: string;
  description: string;
  techStack: string[];
  image: string;
  file: string;
}

export default function HeroSection() {
  const { data, loading, error } = useQuery(GET_INTRO);

  const [deleteData] = useMutation(DELETE_INTRO, {
    update(cache, { data: { deleteIntro } }, { variables: { _id } }) {
      const { getIntro } = cache.readQuery({ query: GET_INTRO }) || { getIntro: [] };
      cache.writeQuery({
        query: GET_INTRO,
        data: {
          getIntro: getIntro.filter((item: IIntroProps) => item._id !== _id),
        },
      });
    },
    onError: (error) => {
      console.error('Delete mutation failed:', error);
      alert('Failed to delete intro: ' + error.message);
    },
  });

  const handleDelete = async (_id: string) => {
    try {
      await deleteData({ variables: { _id } });
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete intro: ' + (error as Error).message);
    }
  };

  const handleEdit = (_id: string) => {
    alert(`Edit functionality for intro id: ${_id} (to be implemented)`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Intro Section</h1>
          <p className="mt-2 text-gray-600">
            This is the intro section of the admin dashboard.
          </p>
        </div>
        <IntroSectionForm />
      </div>

      <div className="border border-gray-800 dark:border-gray-700 my-5"></div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.getIntro?.map((item: IIntroProps) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            <div className="mt-4">
              <p>
                <strong>Tech Stack:</strong> {item.techStack.join(", ")}
              </p>
              <a
                href={item.file}
                className="text-blue-500 mt-2 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download File
              </a>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => handleEdit(item._id)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}