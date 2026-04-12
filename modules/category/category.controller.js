import { Router } from "express";
import { createCategory , getAllCategories , getCategoryById , updateCategory ,deleteCategory, getSubCategoriesByCategory } from "./category.service.js";
import upload from "../../middleware/multer.js";

const router = Router();


router.post('/', upload.single("image") ,createCategory);
router.get('/',getAllCategories);
router.get('/:id',getCategoryById);
router.put('/:id',upload.single("image"),updateCategory);
router.delete('/:id',deleteCategory);
router.get('/:id/subcategories',getSubCategoriesByCategory);



export default router;