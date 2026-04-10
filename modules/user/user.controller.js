import { Router } from "express";
import { getUserProfile , addProfileImage , updateUserProfile , deleteUser } from "./user.service.js";
import upload from './../../middleware/multer.js';

const router = Router();



router.get(`/profile/:id`,getUserProfile);
router.put(`/profile/:id`,upload.single("avatar"),updateUserProfile);
router.delete(`/profile/:id`,deleteUser);
router.post(`/upload-avatar/:id`,upload.single("avatar"),addProfileImage);




export default router;