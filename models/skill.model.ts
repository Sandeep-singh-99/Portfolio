import { Schema, model, models } from "mongoose";

interface ISkill {
    _id?: string;
    skillName: string;
    skillImage: string;
    skillImagePublicId?: string;
}

const skillSchema = new Schema<ISkill>({
    skillName: {
        type: String,
        required: true,
        trim: true
    },
    skillImage: {
        type: String,
        required: true
    },
    skillImagePublicId: {
        type: String
    }
}, { timestamps: true });

const Skill = models.Skill || model<ISkill>("Skill", skillSchema);

export default Skill;