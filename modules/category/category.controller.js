import { Router } from "express";
import { createCategory } from "./category.service.js";

const router = Router();


router.post('/', createCategory);



export default router;