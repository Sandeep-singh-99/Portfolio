import About from "../models/about.model.js";
import { DeleteImage } from "../utils/delete-image.js";
import { UploadImage } from "../utils/upload-image.js";

export const createAbout = async (description, image) => {
    try {
        if (!description || !image) {
            throw new Error("Description and image are required");
        }


        const profileImage = await UploadImage(image, "portfolio");

        const newAbout = await About.create({
            description,
            image: profileImage.secure_url,
            public_id: profileImage.public_id
        })

        return newAbout;
    } catch (error) {
        throw new Error(`Error creating about: ${error.message}`);
    }
}


export const getAbout = async () => {
    try {
        const about = await About.find()

        if (!about || about.length === 0) {
            throw new Error("No about information found");
        }

        return about;
    } catch (error) {
        throw new Error(`Error fetching about: ${error.message}`);
    }
}


export const deleteAbout = async (id) => {
    try {
        const aboutDelete = await About.findById(id);

        if (!aboutDelete) {
            throw new Error("About information not found");
        }

        if (aboutDelete.public_id) {
            await DeleteImage(aboutDelete.public_id);
        }

        await About.findByIdAndDelete(id);
        return { message: "About information deleted successfully" };
    } catch (error) {
        throw new Error(`Error deleting about: ${error.message}`);
    }
}


export const updateAbout = async (id, description, image) => {
    try {
        const about = await About.findById(id);

        if (!about) {
            throw new Error("About information not found");
        }

        if (image) {
            if (about.public_id) {
                await DeleteImage(about.public_id);
            }

            const updatedImage = await UploadImage(image, "portfolio");
            about.image = updatedImage.secure_url;
            about.public_id = updatedImage.public_id;
        }

        const newUpdateAbout = await About.findByIdAndUpdate(id, {
            description,
            image: about.image,
            public_id: about.public_id
        });

        return newUpdateAbout;
    } catch (error) {
        throw new Error(`Error updating about: ${error.message}`);
    }
}