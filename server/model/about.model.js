import { model, Schema } from "mongoose";

const aboutSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        trim: true
    },

    image_id: {
        type: String,
        trim: true
    },
}, {timestamps: true})

const About = model('About', aboutSchema);

export default About;