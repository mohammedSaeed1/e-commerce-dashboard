import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
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
    },
    isDeleted:Boolean,
    deletedAt:Date
},{timestamps:true})

    export const Category = mongoose.model('categories',categorySchema);