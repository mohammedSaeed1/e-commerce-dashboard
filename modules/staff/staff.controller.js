import { Router } from "express";
import { createStaff , getAllStaff , getStaffById , updateStaff , deleteStaff , checkIn , checkOut , addDeduction,getStaffDeductions,getDeductionById,updateDeduction,deleteDeduction , markSalaryAsPaid , getMonthSalary , adjustSalary } from "./staff.service.js";

const router = Router();

// Staff CRUD routes
router.post("/admin/staff",createStaff);
router.get("/admin/staff",getAllStaff);
router.get("/admin/staff/:id",getStaffById);
router.put("/admin/staff/:id",updateStaff);
router.delete("/admin/staff/:id",deleteStaff);
// Attendance routes
router.post("/staff/checkIn",checkIn);
router.post("/staff/checkOut",checkOut);
// Deduction routes
router.post("/admin/staff/:id/deductions",addDeduction);
router.get("/admin/staff/:id/deductions",getStaffDeductions);
router.get("/admin/staff/deduction/:id",getDeductionById);
router.put("/admin/staff/:id/deductions/:deductionId",updateDeduction);
router.delete("/admin/staff/:id/deductions/:deductionId",deleteDeduction);
// Monthly Salary routes
router.get("/admin/staff/:id/salary/:month",getMonthSalary);
router.post("/admin/staff/:id/salary/:month/pay",markSalaryAsPaid);
router.put("/admin/staff/:id/salary/:month/adjust",adjustSalary);
export default router;