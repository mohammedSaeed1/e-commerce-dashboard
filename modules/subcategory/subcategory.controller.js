import { Router } from "express";
import { createSubCategory ,updateSubCategory ,deleteSubCategory,getSubCategoryById } from "./subcategory.service.js";
import upload from "../../middleware/multer.js";

const router = Router();


router.post('/', upload.single("image") ,createSubCategory);
router.get('/:id',getSubCategoryById);
router.put('/:id',upload.single("image"),updateSubCategory);
router.delete('/:id',deleteSubCategory);



export default router;