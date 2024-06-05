import express from 'express';
import { updateUserInfo } from '../controllers/user.controller';

const router = express.Router();

router.post('/update/:id',updateUserInfo)

export default router;

