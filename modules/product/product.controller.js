import { Router } from "express";
import { getAllProducts , getProductById , deleteProduct} from "./product.service.js";

const router = Router();

router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.delete('/:id',deleteProduct);


export default router;