import { model, models, Schema } from "mongoose";

interface IProject {
    _id?: string;
    projectName: string;
    projectDesc: string;
    projectSubDesc: string;
    projectImage: string;
    projectTechStack: string[];
    githubLink: string;
    liveLink: string;
    projectImagePublicId?: string;
    priority: number;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
    projectName: { type: String, required: true },
    projectDesc: { type: String, required: true },
    projectSubDesc: { type: String, required: false },
    projectImage: { type: String, required: true },
    projectTechStack: { type: [String], required: true },
    githubLink: { type: String, required: true },
    liveLink: { type: String, required: true },
    priority: { type: Number, default: 0 },
    projectImagePublicId: { type: String, required: false },
}, { timestamps: true });

const Project = models.Project || model<IProject>("Project", projectSchema);

export default Project;