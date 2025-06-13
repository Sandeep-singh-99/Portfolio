import { model, Schema } from "mongoose";

const skillSchema = new Schema({
    skillName: {
        type: String,
        required: true,
        trim: true
    },

    skillImage: {
        type: String,
        required: true,
        trim: true
    },

    image_id: {
        type: String,
        trim: true
    }
}, { timestamps: true })

const Skill = model('Skill', skillSchema);

export default Skill;