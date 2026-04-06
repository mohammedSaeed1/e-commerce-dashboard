import { Router } from "express";
import { createOrder , getOrdersByUserId , getSpecificOrder , getAllOrders , updateOrderStatus} from "./order.service.js";

const router = Router();


router.post("/orders/checkout",createOrder);
router.get("/orders",getOrdersByUserId);
router.get("/orders/:orderId",getSpecificOrder);
router.get("/admin/orders",getAllOrders);
router.patch("/admin/orders/:orderId/status",updateOrderStatus);


export default router;