import { Router } from "express";
import { createProduct , getAllProducts , getProductById , deleteProduct} from "./product.service.js";
import upload from "../../middleware/multer.js";

const router = Router();

router.post('/',upload.single('image'),createProduct);
router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.delete('/:id',deleteProduct);


export default router;