import { Schema, model, models } from "mongoose";

export interface IIntro {
  _id?: string;
  name: string;
  techStack: string[];
  desc: string;
  image: string;
  file: string;
  imagePublicId?: string;
  filePublicId?: string;
}

const introSchema = new Schema<IIntro>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
    },
    filePublicId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Intro = models.Intro || model<IIntro>("Intro", introSchema);

export default Intro;
