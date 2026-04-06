import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }],
    totalAmount: {
        type: Number
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'card'],
        default: "cod"
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: "pending"
    },
    shippingAddress: {
        type: Object
    },
    createdAt: {
        type: Date
    }
})

export const Order = mongoose.model('orders', orderSchema);