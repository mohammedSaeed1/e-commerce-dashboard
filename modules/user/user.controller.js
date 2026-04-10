import { Router } from "express";
import { getUserProfile , addProfileImage , updateUserProfile , deleteUser } from "./user.service.js";
import upload from './../../middleware/multer.js';
import checkUserDeleted from "../../middleware/checkUserDeleted.js";

const router = Router();



router.get(`/profile/:id`,checkUserDeleted,getUserProfile);
router.put(`/profile/:id`,upload.single("avatar"),checkUserDeleted,updateUserProfile);
router.delete(`/profile/:id`,checkUserDeleted,deleteUser);
router.post(`/upload-avatar/:id`,upload.single("avatar"),checkUserDeleted,addProfileImage);




export default router;