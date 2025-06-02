import { model, Schema } from "mongoose";

const introSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    techStack: [{
        type: String,
        required: true,
        trim: true
    }],

    description: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        required: true,
        trim: true
    },

    public_id: {
        type: String,
    },

    file: {
        type: String,
        required: true,
        trim: true
    },

    filePublic_id: {
        type: String,
    }
}, {timestamps: true});

const Intro = model('Intro', introSchema);

export default Intro;