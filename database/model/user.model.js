import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
     email:{
        type: String,
        required: true,
        unique : true
    },
     password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
    },
    avatar:{
        type: String
    },
    isDeleted: Boolean,
    deletedAt: Date
})

    export const User = mongoose.model('users',userSchema);