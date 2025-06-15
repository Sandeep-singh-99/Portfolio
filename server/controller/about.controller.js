import About from "../model/about.model.js";
import { DeleteImage } from "../utils/delete.image.js";
import { UploadImage } from "../utils/upload.image.js";

export const createAbout = async (req, res) => {
    try {
        const { description } =  req.body;

        if (!description) {
            return res.status(400).json({ error: "Description is required" });
        }

        const image = req.files['image']?.[0];

        const uploadedImage = await UploadImage(image, "portfolio");

        const newAbout = await About.create({
            description,
            image: uploadedImage.secure_url,
            image_id: uploadedImage.public_id
        })

        res.status(201).json({ data: newAbout, message: "About section created successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getAbout = async (req, res) => {
    try {
        const about = await About.find({});
        res.status(200).json({ data: about });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const deleteAbout = async (req, res) => {
    try {
        const { id } = req.params;

        const about = await About.findById(id)
        if (!about) {
            return res.status(404).json({ error: "About section not found" });
        }

        // Delete image from cloud storage
        if (about.image_id) {
            await DeleteImage(about.image_id);
        }

        await About.findByIdAndDelete(id);
        res.status(200).json({ message: "About section deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const updateAbout = async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body;
        if (!id) {
            return res.status(400).json({ error: "ID is required." });
        }

        if (!description) {
            return res.status(400).json({ error: "Description is required." });
        }

        const image = req.files['image']?.[0];

        const about = await About.findById(id);

        if (!about) {
            return res.status(404).json({ error: "About section not found." });
        }

        let updatedData = {}

        if (description) {
            updatedData.description = description;
        }

        if (image) {
            if (about.image_id) {
                await DeleteImage(about.image_id);
            }

            const uploadedImage = await UploadImage(image, "portfolio");
            updatedData.image = uploadedImage.secure_url;
            updatedData.image_id = uploadedImage.public_id;
        }

        const updatedAbout = await About.findByIdAndUpdate(id, updatedData);

        res.status(200).json({ data: updatedAbout, message: "About section updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}