import { Router } from "express";
import { createStaff , getAllStaff , getStaffById , updateStaff , deleteStaff , checkIn , checkOut } from "./staff.service.js";

const router = Router();

router.post("/admin/staff",createStaff);
router.get("/admin/staff",getAllStaff);
router.get("/admin/staff/:id",getStaffById);
router.put("/admin/staff/:id",updateStaff);
router.delete("/admin/staff/:id",deleteStaff);
router.post("/staff/checkIn",checkIn);
router.post("/staff/checkOut",checkOut);

export default router;