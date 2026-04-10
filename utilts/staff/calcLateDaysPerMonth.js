import { Attendance } from "../../database/model/attendance.model.js";

export default async function calcLateDaysPerMonth(id,month){
    const staff = await Attendance.find({staff:id , month, isLate:true});
    return staff.length;
}