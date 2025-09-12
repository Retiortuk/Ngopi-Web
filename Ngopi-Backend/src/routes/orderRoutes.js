import express from 'express';
const router = express.Router();
import { addOrderItem, getAllOrders, getMyOrders, getOrderById, updateOrderStatus } from '../controller/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/createOrder',addOrderItem);
router.get('/myOrder/:id', getOrderById);
router.get('/myOrder', protect, getMyOrders);
router.get('/allOrder', protect, admin, getAllOrders);
router.put('/updateOrder/:id', protect, admin, updateOrderStatus);



export default router;