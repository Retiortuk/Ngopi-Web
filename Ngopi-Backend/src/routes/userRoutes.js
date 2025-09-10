import express from 'express';
const router = express.Router();
import { authUser, registerUser } from '../controller/userController.js';

// Route for login and register (Public)
router.post('/login', authUser);
router.post('/register', registerUser);


export default router;