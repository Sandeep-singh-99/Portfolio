import { model, Schema } from "mongoose";

const aboutSchema = new Schema({
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
    }
}, { timestamps: true });

const About = model('About', aboutSchema);

export default About;