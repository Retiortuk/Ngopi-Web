import express from 'express';
const router = express.Router();
import { admin, protect } from '../middleware/authMiddleware.js';
import { deleteProduct, getProducts, postProduct, updateProduct } from '../controller/productController.js';

router.get('/', getProducts);
router.post('/post', protect, admin, postProduct);
router.delete('/delete/:id', protect, admin, deleteProduct);
router.put('/update/:id', protect, admin, updateProduct);

export default router;