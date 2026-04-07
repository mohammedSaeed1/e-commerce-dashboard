import { Staff } from "../../database/model/staff.model.js";
import { Attendance } from "../../database/model/attendance.model.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

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

export const checkIn = async (req, res) => {
    const { staffId } = req.body;
    const date = dayjs().format("DD MMMM YYYY");
    
    const isAttended = await Attendance.findOne({ staff: staffId, date: date });
    if (isAttended) {
        return res.status(400).json({ message: "Already checked in today" });
    }
    
    const now = dayjs().tz('Africa/Cairo');    
    const nineAM = now.startOf('day').add(9, 'hour');
    const isLate = now.isAfter(nineAM);
    
    const attendance = await Attendance.create({ staff: staffId, date, checkIn: now.format('hh:mm:ss A'), isLate});
    res.status(201).json({ message:"Checked in",data:{attendance} });
};


