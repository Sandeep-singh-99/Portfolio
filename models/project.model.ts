import { model, models, Schema } from "mongoose";

interface IProject {
    _id?: string;
    projectName: string;
    projectDesc: string;
    projectImage: string;
    projectTechStack: string[];
    githubLink: string;
    liveLink: string;
    projectImagePublicId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
    projectName: { type: String, required: true },
    projectDesc: { type: String, required: true },
    projectImage: { type: String, required: true },
    projectTechStack: { type: [String], required: true },
    githubLink: { type: String, required: true },
    liveLink: { type: String, required: true },
    projectImagePublicId: { type: String, required: false },
}, { timestamps: true });

const Project = models.Project || model<IProject>("Project", projectSchema);

export default Project;