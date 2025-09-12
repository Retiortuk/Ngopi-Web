import asynchandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// POST order Only Admin
const addOrderItem = asynchandler(async(req,res)=> {
    const {
        orderItems,
        customerDetails,
        pickupDetails,
        paymentMethod,
        taxPrice,
        totalPrice,
    } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('Tidak Ada Item di Dalam Pesanan');
    } else {
        const order = new Order({
            user: req.user ? req.user._id : null,
            orderItems: orderItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                image: item.image,
                price: item.price,
                note: item.note,
                product: item.product
            })),
            customerDetails,
            pickupDetails,
            paymentMethod,
            taxPrice,
            totalPrice,
        });

        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
});

// GET ORDER FOR USER NOT REIGISTERED/LOGIN
const getOrderById = asynchandler(async(req,res)=> {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );
    if(order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Pesanan Tidak Ditemukan');
    }
});

// GET ORDERS FOR USER
const getMyOrders = asynchandler(async(req,res)=> {
    const order = await Order.find({user: req.user._id});
    if(order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Tidak Ada Orders');
    }
});

// GET ALL ORDERS FOR ADMIN
const getAllOrders = asynchandler(async(req,res)=> {
    const order = await Order.find({}).populate('user', 'id name');
    res.json(order);
});

// UPDATE ORDER STATUS
const updateOrderStatus = asynchandler(async(req,res)=> {
    const order = await Order.findById(req.params.id);

    if(order){
        const {status} = req.body;
        if(!status) {
            res.status(400);
            throw new Error('Status Tidak Boleh Kosong')
        }
        order.status = status;
        const updatedOrderStatus = await order.save();
        res.json(updatedOrderStatus);
    } else {
        res.status(404);
        throw new Error('Pesanan Tidak Ditemukan')
    }
});


export{addOrderItem, getOrderById, getMyOrders, getAllOrders, updateOrderStatus}