import { Schema, model, models } from "mongoose";

export interface ISkill {
  _id?: string;
  skillCategory: string;
  skillName: string;
  skillImage: string;
  skillImagePublicId?: string;
}

const skillSchema = new Schema<ISkill>(
  {
    skillCategory: {
      type: String,
      required: true,
    },
    skillName: {
      type: String,
      required: true,
      trim: true,
    },
    skillImage: {
      type: String,
      required: true,
    },
    skillImagePublicId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Skill = models.Skill || model<ISkill>("Skill", skillSchema);

export default Skill;
