import { Router } from "express";
import { getAllProducts , getProductbyId} from "./product.service.js";

const router = Router();

router.get('/',getAllProducts);
router.get('/:id',getProductbyId);


export default router;