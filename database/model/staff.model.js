import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    dailySalary: {
        type: Number,
        required: true
    },
    joinDate: {
        type: Date
    },
    department: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    monthlyReports: [
        {
            month: String,
            totalDaysWorked: Number,
            finalSalary: Number,
            isPaid: Boolean,
            paidAt: Date
        }
    ]
}, { timestamps: true })

export const Staff = mongoose.model('staffs', staffSchema);