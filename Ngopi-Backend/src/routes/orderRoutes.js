import express from 'express';
const router = express.Router();
import {cancelOrder, cashOrder, createMidtransOrder, deleteOrders, deleteOrdersGuest, getAllOrders, getGuestOrders, getMyOrders, getOrderById, guestCancelOrder, handleMidtransWebhook, updateOrderStatus } from '../controller/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// POST Order
router.post('/cash-order', protect, cashOrder);
router.post('/online', protect, createMidtransOrder);
router.post('/midtrans-webhook', handleMidtransWebhook);
router.post('/guest', getGuestOrders);
// GET ORDERS
router.get('/myOrder/:id', getOrderById);
router.get('/myOrder', protect, getMyOrders);
router.get('/allOrder', protect, admin, getAllOrders);
// PUT ORDERS
router.put('/updateOrder/:id', protect, admin, updateOrderStatus);
router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/guest-cancel', guestCancelOrder);
// DELETE ORDERS
router.delete('/delete-order-guest/:id', deleteOrdersGuest);
router.delete('/delete-order/:id', protect, deleteOrders);



export default router;