import { model, models, Schema } from "mongoose";

export interface IUser {
    _id?: string;
    username: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
}, { timestamps: true });

const User = models.User || model<IUser>("User", userSchema);

export default User;

