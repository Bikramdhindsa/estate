import express from 'express';
import {getUser, editUser, deleteUser, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/getuser', getUser);
router.get('/edituser', editUser);
router.get('/deleteuser', deleteUser);
router.put('/updateuser', updateUser);

export default router;