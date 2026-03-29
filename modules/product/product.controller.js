import { Router } from "express";
import { getAllProducts} from "./product.service.js";

const router = Router();

router.get('/',getAllProducts);


export default router;