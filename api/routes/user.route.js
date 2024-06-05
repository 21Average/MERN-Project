import express from 'express';
import { updateUserInfo } from '../controllers/user.controller.js';
import { vertifyToken } from '../utils/vertifyUser.js';

const router = express.Router();

router.post('/update/:id', vertifyToken, updateUserInfo)

export default router;

