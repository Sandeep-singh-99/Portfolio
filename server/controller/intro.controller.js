import { UploadImage } from '../utils/upload-image.js';
import Intro from '../models/intro.model.js';
import { DeleteImage } from '../utils/delete-image.js';

export const createIntro = async (name, techStack, description, image, file ) => {
    if (!name || !techStack || !description || !image || !file) {
        throw new Error('All fields are required');
    }
    try {
        const uploadImage = await UploadImage(image, 'protfolio');

        const uploadFile = await UploadImage(file, 'protfolio');

        const newIntro = await Intro.create({
            name,
            techStack,
            description,
            image: uploadImage.secure_url,
            public_id: uploadImage.public_id,
            file: uploadFile.secure_url,
            filePublic_id: uploadFile.public_id
        });

        return newIntro;
    } catch (error) {
        throw new Error('Failed to create intro: ' + error.message);
    }
}


export const getIntro = async () => {
    try {
        const intro = await Intro.find()

        if (!intro || intro.length === 0) {
            throw new Error('No intro found');
        }

        return intro;
    } catch (error) {
        throw new Error('Failed to fetch intro: ' + error.message);
    }
}


export const deleteIntro = async (id) => {
    try {
        const intro = await Intro.findById(id);
        if (!intro) {
            throw new Error('Intro not found');
        }

        // Delete image and file from cloud storage
        if (intro.public_id) {
            await DeleteImage(intro.public_id);
        }

        if (intro.filePublic_id) {
            await DeleteImage(intro.filePublic_id);
        }

        // Delete intro from database
        const deletedIntro = await Intro.findByIdAndDelete(id);
        if (!deletedIntro) {
            throw new UserInputError('Failed to delete intro');
        }

        return {
            message: 'Intro deleted successfully',
        };
    } catch (error) {
        throw new Error('Failed to delete intro: ' + error.message);
    }
}


export const updateIntro = async (id, name, techStack, description, image, file) => {
    try {
        const intro = await Intro.findById(id);
        if (!intro) {
            throw new Error('Intro not found');
        }

        // Update image if provided
        let updatedImage = intro.image;
        let updatedPublicId = intro.public_id;
        if (image) {
            if (intro.public_id) {
                await DeleteImage(intro.public_id);
            }
            const uploadImage = await UploadImage(image, 'protfolio');
            updatedImage = uploadImage.secure_url;
            updatedPublicId = uploadImage.public_id;
        }

        // Update file if provided
        let updatedFile = intro.file;
        let updatedFilePublicId = intro.filePublic_id;
        if (file) {
            if (intro.filePublic_id) {
                await DeleteImage(intro.filePublic_id);
            }
            const uploadFile = await UploadImage(file, 'protfolio');
            updatedFile = uploadFile.secure_url;
            updatedFilePublicId = uploadFile.public_id;
        }

        const updatedIntro = await Intro.findByIdAndUpdate(id, {
            name,
            techStack,
            description,
            image: updatedImage,
            public_id: updatedPublicId,
            file: updatedFile,
            filePublic_id: updatedFilePublicId
        });

        return updatedIntro;
    } catch (error) {
        throw new Error('Failed to update intro: ' + error.message);
    }
}