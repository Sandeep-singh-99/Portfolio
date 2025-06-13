import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ADD_INTRO } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from 'axios';

export function IntroSectionForm() {
  const [addIntro, { loading }] = useMutation(ADD_INTRO);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    techStack: [] as string[],
    image: "",
    file: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "techStack") {
      setFormData((prev) => ({
        ...prev,
        techStack: value.split(",").map((item) => item.trim()).filter(Boolean),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      if (files[0].size > 1 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `File size exceeds 1MB limit for ${name}.`,
        });
        return;
      }
      try {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'YOUR_CLOUDINARY_UPLOAD_PRESET'); // Replace with your preset
        formData.append('folder', name === 'image' ? 'intros' : 'intros/files');

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/${name === 'image' ? 'image' : 'raw'}/upload`,
          formData
        );
        setFormData((prev) => ({
          ...prev,
          [name]: response.data.secure_url,
        }));
        toast({
          title: "Success",
          description: `${name} uploaded successfully.`,
        });
      } catch (error) {
        console.error(`Failed to upload ${name}:`, error);
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to upload ${name}.`,
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.image || !formData.file) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required.",
      });
      return;
    }

    try {
      const variables = {
        name: formData.name,
        description: formData.description,
        techStack: formData.techStack,
        image: formData.image,
        file: formData.file,
      };
      console.log('Mutation variables:', variables);
      const { data } = await addIntro({ variables });
      toast({
        title: "Success",
        description: "Intro section created successfully!",
      });
      console.log("Intro added:", data);

      setFormData({
        name: "",
        description: "",
        techStack: [],
        image: "",
        file: "",
      });
    } catch (error) {
      console.error("Error adding intro:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create intro section. Please try again.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create Intro Section</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Intro Section</DialogTitle>
            <DialogDescription>
              Fill out the details for your intro section. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter a brief description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="techStack">Tech Stack</Label>
              <Input
                id="techStack"
                name="techStack"
                placeholder="e.g. React, Node.js, MongoDB"
                value={formData.techStack.join(", ")}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image Upload (Max 1MB)</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              <Label htmlFor="imageUrl">Or Image URL</Label>
              <Input
                id="imageUrl"
                name="image"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">File Upload (Max 1MB)</Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />
              <Label htmlFor="fileUrl">Or File URL</Label>
              <Input
                id="fileUrl"
                name="file"
                placeholder="Enter file URL"
                value={formData.file}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}