import { Staff } from "../../database/model/staff.model.js";
import { Attendance } from "../../database/model/attendance.model.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { Deduction } from "../../database/model/deduction.model.js";
import calcTotalDaysWorkedPerMonth from "../../utilts/staff/calcTotalDaysWorkedPerMonth.js";
import calcLateDaysPerMonth from "../../utilts/staff/calcLateDaysPerMonth.js";
import calcAbsentDaysPerMonth from "../../utilts/staff/calcAbsentDaysPerMonth.js";
import calcDeductionsPerMonth from "../../utilts/staff/calcDeductionsPerMonth.js";


// Staff CRUD operations

export const createStaff = async (req, res) => {
    const { userId, dailySalary , joinDate , department , isActive} = req.body;
    const staff = await Staff.create({ user: userId, dailySalary , joinDate , department , isActive});
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
    const month = dayjs().format("MMMM");

    const attendance = await Attendance.create({ staff: staffId, date,month,checkIn: now.format('hh:mm:ss A'), isLate,type:"check-in" });
    res.status(201).json({ message: "Checked in success", data: { attendance } });
};

export const checkOut = async (req, res) => {
    const { staffId } = req.body;
    const date = dayjs().format("DD MMMM YYYY");
    const prevDate = dayjs().subtract(1, 'day').format("DD MMMM YYYY"); 
    
    const staff = await Staff.findById(staffId);
    if(!staff) return res.status(404).json({message:"this staff is not exists"});
 
    const isCheckedIn = await Attendance.findOne({staff:staffId , date , type:"check-in"});
    const preDayCheckIn = await Attendance.findOne({staff:staffId , date:prevDate , type:"check-in"});
       

    const now = dayjs().tz('Africa/Cairo');       
    const checkIn = dayjs(isCheckedIn.checkIn,'hh:mm:ss A');
    const checkOut = dayjs(now,'hh:mm:ss A');
    const totalMinutes = checkOut.diff(checkIn, 'minute');
    const hours   = Math.floor(totalMinutes / 60);
    const month = dayjs().format("MMMM");
    const workingHours = hours;
    if(hours < 8){
    // calculate deduction here
    }

    const checkAbsent =  await Attendance.findOne({_id:staffId,date:prevDate,type:"check-out"});
    if(!checkAbsent && preDayCheckIn){
   preDayCheckIn.isAbsent = true;
    await preDayCheckIn.save();
    } 
    
    const attendance = await Attendance.create({staff:staffId,date,month,checkOut:checkOut.format("hh:mm:ss A"),workingHours,type:"check-out"});
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

// Monthly Salary Apis

export const getMonthSalary = async (req , res) =>{
    const {id , month} = req.params;
    const staff = await Staff.findById(id);
    if(!staff) return res.status(404).json({message:"this staff is not exsits"});
    const report = staff.monthlyReports.find(report => report.month == month);
    if(!report) return res.status(400).json({message:"this month is not allowed !!"});
    const totalDaysWorked = await calcTotalDaysWorkedPerMonth(id,month);    
    const lateDays = await calcLateDaysPerMonth(id,month);
    const absentDays = await calcAbsentDaysPerMonth(id,month);
    const manualDeductions = await calcDeductionsPerMonth(id,month);
        
    const baseSalary = staff.dailySalary * totalDaysWorked; 
    const deductions = lateDays * (staff.dailySalary * 0.1) + absentDays * staff.dailySalary + manualDeductions;
    const finalSalary = baseSalary - deductions;
    res.status(200).json({message:"success",data:{baseSalary,deductions,finalSalary,isPaid:report.isPaid}});
}

export const markSalaryAsPaid = async (req , res) =>{
      const {id , month} = req.params;
      const staff = await Staff.findById(id);
      if(!staff) return res.status(404).json({message:"this staff is not exists"});
     let report = staff.monthlyReports.find(report => report.month == month);     
     if(!report){
          report = {month, isPaid : true};
          staff.monthlyReports.push(report);
     }
     else report.isPaid = true;
     await staff.save();
     res.status(200).json({message:"success",data:{staff}});
    }
    export const adjustSalary = async (req , res) =>{
      const {id , month} = req.params;
      const {adjustSalary} = req.body;
      const staff = await Staff.findById(id);
      if(!staff) return res.status(404).json({message:"this staff is not exists"});
      let report = staff.monthlyReports.find(report => report.month == month);     
     if(!report){
          report = {month, finalSalary:adjustSalary};
          staff.monthlyReports.push(report);
     }
     else report.finalSalary = adjustSalary;
     await staff.save();
     res.status(200).json({message:"success",data:{staff}});
    }

