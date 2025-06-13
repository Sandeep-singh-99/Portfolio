import Skill from "../model/skill.model.js";
import { DeleteImage } from "../utils/delete.image.js";
import { UploadImage } from "../utils/upload.image.js";

export const createSkill = async (req, res) => {
    try {
        const { skillName } =  req.body;

        if (!skillName) {
            return res.status(400).json({ error: "Skill name is required" });
        }

        const image = req.files['image']?.[0];

        const imageUpload = image ? await UploadImage(image, "portfolio") : null;

        const newSkill = await Skill.create({
            skillName,
            skillImage: imageUpload.secure_url,
            image_id: imageUpload.public_id
        })

        res.status(201).json({ data: newSkill, message: "Skill created successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({});

       if (!skills || skills.length === 0) {
            return res.status(404).json({ error: "No skills found." });
        }

        res.status(200).json({ data: skills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ error: "ID is required." });
        }

        const skill = await Skill.findById(id);
        if (!skill) {
            return res.status(404).json({ error: "Skill not found." });
        }

        if (skill.image_id) {
            await DeleteImage(skill.image_id);
        }

        await Skill.findByIdAndDelete(id);
        res.status(200).json({ message: "Skill deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const updateSkill = async (req, res) => {
    try {
        const  { id } = req.params;
        const { skillName } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID is required." });
        }

        if (!skillName) {
            return res.status(400).json({ error: "Skill name is required." });
        }

        const skill = await Skill.findById(id);
        if (!skill) {
            return res.status(404).json({ error: "Skill not found." });
        }

        const image = req.files['image']?.[0];

        let updatedData = {}

        if (skillName) {
            updatedData.skillName = skillName;
        }

        if (image) {
            if (skill.image_id) {
                await DeleteImage(skill.image_id);
            }
            const imageUpload = await UploadImage(image, "portfolio");
            updatedData.skillImage = imageUpload.secure_url;
            updatedData.image_id = imageUpload.public_id;
        }


        const updatedSkill = await Skill.findByIdAndUpdate(id, updatedData );
        if (!updatedSkill) {
            return res.status(404).json({ error: "Skill not found." });
        }

        res.status(200).json({ data: updatedSkill, message: "Skill updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}