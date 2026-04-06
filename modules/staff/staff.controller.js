import { Router } from "express";
import { createStaff , getAllStaff , getStaffById , updateStaff , deleteStaff } from "./staff.service.js";

const router = Router();

router.post("/admin/staff",createStaff);
router.get("/admin/staff",getAllStaff);
router.get("/admin/staff/:id",getStaffById);
router.put("/admin/staff/:id",updateStaff);
router.delete("/admin/staff/:id",deleteStaff);


export default router;