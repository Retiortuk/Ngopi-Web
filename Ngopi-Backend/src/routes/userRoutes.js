import express from 'express';
const router = express.Router();
import { authUser, getUserProfiles, registerUser } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Route for login and register (Public)
router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/profile',protect, getUserProfiles);


export default router;