import { Deduction } from "../../database/model/deduction.model.js";

export default async function calcDeductionsPerMonth(id,month){
    const deduction = await Deduction.find({staff:id,month});
   return deduction.reduce((sum , deduction) => sum + deduction.amount , 0);
}