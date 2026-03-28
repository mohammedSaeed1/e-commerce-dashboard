import express from 'express';
import {register} from './user.service.js';
const router = express.Router();

router.post('/register',register);



export default router;