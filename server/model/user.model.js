import { model, Schema } from "mongoose";

const userSchema = new Schema({
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
    }
}, {timestamps: true});

const User = model('User', userSchema);

export default User;