import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
    },
    name:{
        type: String,
        default: ""
    },
    phone:{
        type: String,
        default: ""
    },
    address:{
        type: String,
        default: ""
    },
    avatar:{
        type: String,
        default: ""
    }

},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;