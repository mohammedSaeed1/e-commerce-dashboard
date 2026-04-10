import { Router } from "express";
import { getUserProfile } from "./user.service.js";

const router = Router();



router.get(`/profile/:id`,getUserProfile);





export default router;