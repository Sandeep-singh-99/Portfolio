import { model, Schema } from "mongoose";

const introSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    techStack: {
        type: [String],
        required: true,
        default: []
    },

    image: {
        type: String,
        required: true,
        trim: true
    },

    image_id: {
        type: String,
    },

    file: {
        type: String,
        required: true,
        trim: true
    },

    file_id: {
        type: String,
    },
})


const Intro = model('Intro', introSchema);

export default Intro;