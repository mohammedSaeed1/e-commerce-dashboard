import { Attendance } from "../../database/model/attendance.model.js";

export default async function calcAbsentDaysPerMonth(id,month){
    const staff = await Attendance.find({staff:id , month, isAbsent:true});
    return staff.length;
}