import Skill from "../models/skill.model.js";
import { DeleteImage } from "../utils/delete-image";
import { UploadImage } from "../utils/upload-image.js";

export const createSkill = async (skillName, skillImage) => {
    try {
        if (!skillName || !skillImage) {
            throw new Error('Skill name and image are required');
        }

        const uploadImage = await UploadImage(skillImage, 'portfolio');

        const newSkill = await Skill.create({
            skillName,
            skillImage: uploadImage.secure_url,
            public_id: uploadImage.public_id
        })

        return newSkill;
    } catch (error) {
        throw new Error(`Error creating skill: ${error.message}`);
    }
}

export const fetchSkills = async () => {
    try {
        const skills = await Skill.find().sort({ createdAt: -1 });

        if (skills.length === 0) {
            throw new Error('No skills found');
        }

        return skills;
    } catch (error) {
        throw new Error(`Error fetching skills: ${error.message}`);
    }
}

export const deleteSkill = async (id) => {
    try {
        const skill = await Skill.findById(id);

        if (!skill) {
            throw new Error('Skill not found');
        }

        if (skill.public_id) {
            await DeleteImage(skill.public_id);
        }

        await Skill.findByIdAndDelete(id);
        return { message: 'Skill deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting skill: ${error.message}`);
    }
}

export const updateSkill = async (id, skillName, skillImage) => {
    try {
        const skill = await Skill.findById(id)

        if (!skill) {
            throw new Error('Skill not found');
        }

        if (skillImage) {
            if (skill.public_id) {
                await DeleteImage(skill.public_id);
            }

            const uploadImage = await UploadImage(skillImage, 'portfolio');
            skill.skillImage = uploadImage.secure_url;
            skill.public_id = uploadImage.public_id;
        }

        const updatedSkill = await Skill.findByIdAndUpdate(id, {
            skillName,
            skillImage: skill.skillImage,
            public_id: skill.public_id
        })

        return updatedSkill;
    } catch (error) {
        throw new Error(`Error updating skill: ${error.message}`);
    }
}