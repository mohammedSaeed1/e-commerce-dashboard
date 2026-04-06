import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staffs",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    checkIn: Date,
    checkOut: Date,
    isLate: Boolean,
},{timestamps:true})

export const Attendance = mongoose.model('attendances',attendanceSchema);