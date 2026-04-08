import { Staff } from "../../database/model/staff.model.js";
import { Attendance } from "../../database/model/attendance.model.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { Deduction } from "../../database/model/deduction.model.js";


// Staff CRUD operations

export const createStaff = async (req, res) => {
    const { userId, dailySalary } = req.body;
    const staff = await Staff.create({ user: userId, dailySalary });
    if (!staff) return res.status(500).json({ message: "Internal server error" });
    res.status(201).json({ message: "success", data: { staff } });
}

export const getAllStaff = async (req, res) => {
    const staffs = await Staff.find().populate('user');
    if (staffs.length <= 0) return res.status(400).json({ message: "No staffs at this time" });
    res.status(200).json({ message: "success", data: { staffs } });
}

export const getStaffById = async (req, res) => {
    const { id } = req.params;
    const staff = await Staff.findById(id).populate('user');
    if (!staff) return res.status(404).json({ message: "this staff is not exists" });
    res.status(200).json({ message: "success", data: { staff } });
}

export const updateStaff = async (req, res) => {
    const { id } = req.params;
    const { dailySalary } = req.body;
    const staff = await Staff.findByIdAndUpdate(id, { dailySalary }, { new: true }).populate('user');
    if (!staff) return res.status(404).json({ message: "this staff is not exists" });
    res.status(200).json({ message: "success", data: { staff } });
}

export const deleteStaff = async (req, res) => {
    const { id } = req.params;
    const staff = await Staff.findByIdAndDelete(id);
    if (!staff) return res.status(404).json({ message: "this staff is not exists" });
    res.status(200).json({ message: "success" });
}

// Attendance Apis

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const checkIn = async (req, res) => {
    const { staffId } = req.body;
    const date = dayjs().format("DD MMMM YYYY");

    const staff = await Staff.findById(staffId);
    if(!staff) return res.status(404).json({message:"this staff is not exists"});

    const isAttended = await Attendance.findOne({ staff: staffId, date: date });
    if (isAttended) {
        return res.status(400).json({ message: "Already checked in today" });
    }

    const now = dayjs().tz('Africa/Cairo');
    const nineAM = now.startOf('day').add(9, 'hour');
    const isLate = now.isAfter(nineAM);

    const attendance = await Attendance.create({ staff: staffId, date, checkIn: now.format('hh:mm:ss A'), isLate,type:"check-in" });
    res.status(201).json({ message: "Checked in success", data: { attendance } });
};

export const checkOut = async (req, res) => {
    const { staffId } = req.body;
    const date = dayjs().format("DD MMMM YYYY");

    const staff = await Staff.findById(staffId);
    if(!staff) return res.status(404).json({message:"this staff is not exists"});

    const isAttended = await Attendance.findOne({ staff: staffId, date });
    if (!isAttended) return res.status(404).json({ message: "You're not checked in today!!" });

    const now = dayjs().tz('Africa/Cairo');       
    const checkIn = dayjs(isAttended.checkIn,'hh:mm:ss A');
    const checkOut = dayjs(now,'hh:mm:ss A');
    const totalMinutes = checkOut.diff(checkIn, 'minute');
    const hours   = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;    
    const workingHours = `${hours}h : ${minutes}m`;
    if(hours < 8){
    // calculate deduction here
    }
    const attendance = await Attendance.create({staff:staffId,date,checkOut:checkOut.format("hh:mm:ss A"),workingHours,type:"check-out"});
    res.status(201).json({message:"checked out success",data:{attendance}});
}

// Salary & Deduction APIs

export const addDeduction = async (req , res) =>{
      const {id} = req.params;
      const {month , amount , reason} = req.body;
      const deduction = await Deduction.create({staff:id,month,amount,reason});
      if(!deduction) return res.status(500).json({message:"Can't add this deduction now , Internal Server Error"});
      return res.status(201).json({message:"success",data:{deduction}});
} 

export const getStaffDeductions = async (req , res) =>{
      const {id} = req.params;
      const deductions = await Deduction.find({staff:id});
      if(deductions.length <= 0) return res.status(404).json({message:"No deductions at this time"});
      return res.status(200).json({message:"success",data:{deductions}});
}

export const getDeductionById = async (req , res) =>{
      const {id} = req.params;
      const deduction = await Deduction.findById(id);
      if(!deduction) return res.status(404).json({message:"this deduction is not exists"});
      return res.status(200).json({message:"success",data:{deduction}});
}

export const updateDeduction = async (req , res) =>{
      const {id , deductionId} = req.params;
      const {amount , reason , date} = req.body;
      const staff = await Staff.findById(id);
      if(!staff) return res.status(404).json({message:"this staff is not exists"});
      const deduction = await Deduction.findByIdAndUpdate(deductionId, {amount , reason , date}, {new:true});
      if(!deduction) return res.status(404).json({message:"this deduction is not exists"});
      return res.status(200).json({message:"success",data:{deduction}});
}

export const deleteDeduction = async (req , res) =>{
      const {id , deductionId} = req.params;
      const staff = await Staff.findById(id);
      if(!staff) return res.status(404).json({message:"this staff is not exists"});
      const deduction = await Deduction.findByIdAndDelete(deductionId);
      if(!deduction) return res.status(404).json({message:"this deduction is not exists"});
      return res.status(200).json({message:"success"});
}

// 