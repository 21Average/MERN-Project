import express from 'express';
import { updateUserInfo, deleteUser } from '../controllers/user.controller.js';
import { vertifyToken } from '../utils/vertifyUser.js';

const router = express.Router();

router.post('/update/:id', vertifyToken, updateUserInfo)
router.delete('/delete/:id', vertifyToken, deleteUser)

export default router;

