import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    images: {
        type: [String]
    },
    description: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean
    },
    deletedAt: {
        type: Date
    },
    autoDeletedAt:
    {
        type: Date
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "categories"
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "brands"
    }

}, { timestamps: true })

export const Product = mongoose.model('products', productSchema);