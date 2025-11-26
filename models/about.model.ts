import { Schema, model, models } from "mongoose";

export interface IAbout {
  _id?: string;
  desc: string;
}

const aboutSchema = new Schema<IAbout>(
  {
    desc: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const About = models.About || model<IAbout>("About", aboutSchema);

export default About;
