import { Router } from "express";
import { createCategory } from "./category.service.js";
import upload from "../../middleware/multer.js";

const router = Router();


router.post('/', upload.single("image") ,createCategory);



export default router;