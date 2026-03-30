import { Router } from "express";
import { createCategory , getAllCategories , getCategoryById , updateCategory } from "./category.service.js";
import upload from "../../middleware/multer.js";

const router = Router();


router.post('/', upload.single("image") ,createCategory);
router.get('/',getAllCategories);
router.get('/:id',getCategoryById);
router.put('/:id',upload.single("image"),updateCategory);



export default router;