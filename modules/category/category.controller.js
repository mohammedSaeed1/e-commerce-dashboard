import { Router } from "express";
import { createCategory , getAllCategories } from "./category.service.js";
import upload from "../../middleware/multer.js";

const router = Router();


router.post('/', upload.single("image") ,createCategory);
router.get('/',getAllCategories);



export default router;