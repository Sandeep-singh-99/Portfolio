import { models, Schema, model } from "mongoose";

export interface IBlog {
    _id?: string;
    title: string;
    image: string;
    imagePublicId: string;
    content: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },

    image: {
        type: String,
    },

    imagePublicId: {
        type: String,
    },

    content: {
        type: String,
    },

    tags: {
        type: [String],
    },
}, { timestamps: true })

const Blog = models.Blog || model<IBlog>("Blog", blogSchema)

export default Blog
