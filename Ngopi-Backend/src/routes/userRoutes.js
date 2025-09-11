import express from 'express';
const router = express.Router();
import { authUser, deleteUser, getUserProfiles, getUsers, registerUser, updateProfile } from '../controller/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/profile',protect, getUserProfiles);
router.put('/profile', protect, updateProfile );
router.get('/', protect, admin, getUsers);
router.delete('/delete/:id', protect, admin, deleteUser);


export default router;