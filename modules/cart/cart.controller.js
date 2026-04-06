import { Router } from "express";
import { addToCart , getCart , removeFromCart , updateProductQuantity , clearCart } from "./cart.service.js";

const router = Router();


router.post("/",addToCart);
router.get("/:userId",getCart);
router.put("/:productId",updateProductQuantity);
router.delete("/:productId",removeFromCart);
router.delete("/:userId",clearCart);


export default router;