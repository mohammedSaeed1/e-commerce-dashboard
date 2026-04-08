import mongoose from "mongoose";

const deductionSchema = new mongoose.Schema({
    staff:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "staffs",
        required:true
    },
     month:{
        type: String,
        required: true,
    },
     date:{
        type: date,
    },
    amount:{
        type:Number,
        required:true
    },
    reason:String

},{timestamps:true})

    export const Deduction = mongoose.model('deductions',deductionSchema);