import { Attendance } from "../../database/model/attendance.model.js";

export default async function calcTotalDaysWorkedPerMonth(id,month){
    const staff = await Attendance.find({staff:id , month});
    return staff.length / 2 ;
}