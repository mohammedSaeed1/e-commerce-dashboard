import { Router } from "express";
import { createProduct , getAllProducts , getProductById , updateProduct, updateProductStock,deleteProduct , filterByCategory , filterBySubCategory} from "./product.service.js";
import upload from "../../middleware/multer.js";

const router = Router();

router.post('/',upload.array('images'),createProduct);
router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.put('/:id',upload.array('images'),updateProduct);
router.patch('/:id/stock',updateProductStock);
router.delete('/:id',deleteProduct);
router.get('/category/:categoryId',filterByCategory);
router.get('/subcategory/:subcategoryId',filterBySubCategory);

export default router;