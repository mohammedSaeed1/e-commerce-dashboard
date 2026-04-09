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
    checkIn: String,
    checkOut: String,
    isLate: Boolean,
    isAbsent: Boolean,
    workingHours: Number,
    month:String,
    type:{
      type:String,
      enum: ["check-in","check-out"],
      required:true
    }
},{timestamps:true});


attendanceSchema.index({ staff: 1, date: 1 , type:1 }, { unique: true });

export const Attendance = mongoose.model('attendances',attendanceSchema);