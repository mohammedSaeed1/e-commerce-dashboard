import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
     slug:{
        type: String,
        required: true,
        unique : true
    },
     image:{
        type: String,
    }
},{timestamps:true})

    export const Brand = mongoose.model('brands',brandSchema);