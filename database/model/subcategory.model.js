import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
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

    export const Subcategory = mongoose.model('subcategories',subcategorySchema);