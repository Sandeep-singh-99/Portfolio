import Project from "../models/project.model.js";
import { DeleteImage } from "../utils/delete-image.js";
import { UploadImage } from "../utils/upload-image.js"

export const  createProject = async (projectName, projectDescription, projectTechStack, projectImage, liveLink, githubLink) => {
    try {
        if (!projectName || !projectDescription || !projectTechStack || !projectName || !projectImage || !liveLink || !githubLink) {
            throw new Error()
        }

        const imageUpload = await UploadImage(projectImage, "portfolio");

        const newProject = await Project.create({
            projectName,
            projectDescription,
            projectTechStack,
            projectImage: imageUpload.secure_url,
            public_id: imageUpload.public_id,
            liveLink,
            githubLink
        })

        return newProject;
    } catch (error) {
        throw new Error('Error creating project: ', error.message)
    }
}

export const fetchProject = async () => {
    try {
        const projects = await Project.find()

        if (!projects || projects.length === 0) {
            throw new Error("No projects found");
        }

        return projects;
    } catch (error) {
        throw new Error(`Error fetching projects: ${error.message}`);
    }
}

export const deleteProject = async (id) => {
    try {
        const projectToDelete = await Project.findById(id)

        if (!projectToDelete) {
            throw new Error("Project not found");
        }

        if (projectToDelete.public_id) {
            await DeleteImage(projectToDelete.public_id);
        }

        await Project.findByIdAndDelete(id);

        return { message: "Project deleted successfully" };
    } catch (error) {
        throw new Error(`Error deleting project: ${error.message}`);
    }
}


export const updateProject = async (id, projectName, projectDescription, projectTechStack, projectImage, liveLink, githubLink) => {
    try {
        const project = await Project.findById(id)
        if (!project) {
            throw new Error("Project not found");
        }

        if (projectImage) {
            if (project.public_id) {
                await DeleteImage(project.public_id);
            }
            const imageUpload = await UploadImage(projectImage, "portfolio");
            project.projectImage = imageUpload.secure_url;
            project.public_id = imageUpload.public_id;
        }

        const updateProject = await Project.findByIdAndUpdate(id,  {
            projectName,
            projectDescription,
            projectTechStack,
            projectImage: project.projectImage,
            public_id: project.public_id,
            liveLink,
            githubLink
        });

        return updateProject;
    } catch (error) {
        throw new Error(`Error updating project: ${error.message}`);
    }
}