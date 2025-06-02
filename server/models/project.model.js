import { model, Schema } from "mongoose";

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },

    projectDescription: {
        type: String,
        required: true,
        trim: true
    },

    projectTechStack: [{
        type: String,
        required: true,
        trim: true
    }],

    projectImage: [{
        type: String,
        required: true,
        trim: true
    }],

    public_id: [{
        type: String,
    }],

    liveLink: {
        type: String,
        required: true,
        trim: true
    },

    githubLink: {
        type: String,
        required: true,
        trim: true
    },

}, { timestamps: true });

const Project = model('Project', projectSchema);

export default Project;