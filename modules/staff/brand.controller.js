import { Router } from "express";
import { createBrand , getAllBrands , getBrandById , updateBrand ,deleteBrand } from "./brand.service.js";
import upload from "../../middleware/multer.js";

const router = Router();


router.post('/', upload.single("image") ,createBrand);
router.get('/',getAllBrands);
router.get('/:id',getBrandById);
router.put('/:id',upload.single("image"),updateBrand);
router.delete('/:id',deleteBrand);



export default router;