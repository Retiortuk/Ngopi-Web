import express from 'express';
const router = express.Router();
import { admin, protect } from '../middleware/authMiddleware.js';
import { getProducts, postProduct } from '../controller/productController.js';

router.get('/', getProducts);
router.post('/post', protect, admin, postProduct);

export default router;