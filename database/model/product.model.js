import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
     slug:{
        type: String,
        required: true,
        unique : true
    },
     image:{
        type: String,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ratingAverage:{
        type:Number
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref: "categories"
    },
    brand:{
        type: mongoose.Types.ObjectId,
        ref: "brands"
    }

},{timestamps:true})

    export const Product = mongoose.model('products',productSchema);