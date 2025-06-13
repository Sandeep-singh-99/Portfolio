import Intro from "../model/intro.model.js";
import { DeleteImage } from "../utils/delete.image.js";
import { UploadImage } from "../utils/upload.image.js";

export const createIntro = async (req, res) => {
    try {
        const { name, description, techStack } = req.body;

        const image = req.files['image']?.[0]
        const file = req.files['file']?.[0]

        if (!name || !description || !techStack) {
            return res.status(400).json({ error: "Name, description, and tech stack are required." });
        }

        const imageUpload = await UploadImage(image, "portfolio")

        const fileUpload = await UploadImage(file, "portfolio")

        const newIntro = await Intro.create({
            name,
            description,
            techStack: techStack.split(',').map((tech) => tech.trim()), 
            image: imageUpload.secure_url,
            image_id: imageUpload.public_id,
            file: fileUpload.secure_url,
            file_id: fileUpload.public_id
        })


        res.status(201).json({ data: newIntro, message: "Intro created successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getIntro = async (req, res) => {
    try {
        const intro = await Intro.find({})

        if (intro.length === 0) {
            return res.status(404).json({ error: "No intro found." });
        }

        res.status(200).json({ data: intro });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteIntro = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ error: "ID is required." });
        }

        const intro = await Intro.findById(id);

        if (!intro) {
            return res.status(404).json({ error: "Intro not found." });
        }

        // Delete image and file from cloudinary
        if (intro.image_id) {
            await DeleteImage(intro.image_id);
        }

        if (intro.file_id) {
            await DeleteImage(intro.file_id);
        }


        await Intro.findByIdAndDelete(id);
        res.status(200).json({ message: "Intro deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// export const updateIntro = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description, techStack } = req.body;

//         if (!id) {
//             return res.status(400).json({ error: "ID is required." });
//         }

//         const image = req.files['image']?.[0];
//         const file = req.files['file']?.[0];

//         if (!name || !description || !techStack) {
//             return res.status(400).json({ error: "Name, description, and tech stack are required." });
//         }

//         const intro = await Intro.findById(id);
//         if (!intro) {
//             return res.status(404).json({ error: "Intro not found." });
//         }

//         let imageUpload, fileUpload;
//         if (image) {
//             // Delete old image if it exists
//             if (intro.image_id) {
//                 await DeleteImage(intro.image_id);
//             }
//             imageUpload = await UploadImage(image, "portfolio");
//         }

//         if (file) {
//             // Delete old file if it exists
//             if (intro.file_id) {
//                 await DeleteImage(intro.file_id);
//             }
//             fileUpload = await UploadImage(file, "portfolio");
//         }

//         const updatedIntro = await Intro.findByIdAndUpdate(id, {
//             name,
//             description,
//             techStack: techStack.split(',').map((tech) => tech.trim()),
//             image: imageUpload ? imageUpload.secure_url : intro.image,
//             image_id: imageUpload ? imageUpload.public_id : intro.image_id,
//             file: fileUpload ? fileUpload.secure_url : intro.file,
//             file_id: fileUpload ? fileUpload.public_id : intro.file_id
//         });


//         res.status(200).json({ data: updatedIntro, message: "Intro updated successfully!" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }


export const updateIntro = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, techStack } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID is required." });
        }

        const image = req.files?.['image']?.[0];
        const file = req.files?.['file']?.[0];

        const intro = await Intro.findById(id);
        if (!intro) {
            return res.status(404).json({ error: "Intro not found." });
        }

        let updatedData = {};

        // Update name if provided
        if (name) {
            updatedData.name = name;
        }

        // Update description if provided
        if (description) {
            updatedData.description = description;
        }

        // Update techStack if provided
        if (techStack) {
            updatedData.techStack = techStack.split(',').map((tech) => tech.trim());
        }

        // Handle image update if provided
        if (image) {
            if (intro.image_id) {
                await DeleteImage(intro.image_id);
            }
            const imageUpload = await UploadImage(image, "portfolio");
            updatedData.image = imageUpload.secure_url;
            updatedData.image_id = imageUpload.public_id;
        }

        // Handle file update if provided
        if (file) {
            if (intro.file_id) {
                await DeleteImage(intro.file_id);
            }
            const fileUpload = await UploadImage(file, "portfolio");
            updatedData.file = fileUpload.secure_url;
            updatedData.file_id = fileUpload.public_id;
        }

        const updatedIntro = await Intro.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({ data: updatedIntro, message: "Intro updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
