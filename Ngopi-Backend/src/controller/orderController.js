import asynchandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import midtransClient from 'midtrans-client';


//PUT Cancel Order for registered user
const cancelOrder = asynchandler(async(req, res)=> {
    const order =  await Order.findById(req.params.id);

    if(order) {
        if(order.user && order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            res.status(401);
            throw new Error('Not Allowed to cancel this order');
        };

        if(order.status === 'Waiting Payment') {
            order.status = 'Cancelled'
            await order.save();
            res.json({message: 'Successfully Cancelled your Order'})
        } else {
            res.status(400).json({messsage: `Cannot Cancel You Order Because Order is Already: ${order.status}`})
        }
    } else {
        res.status(400);
        throw new Error("Order Can't be Found!")
    }
});

// PUT Cancel Order for Unregistered User
const guestCancelOrder = asynchandler(async(req, res)=> {
    const order =  await Order.findById(req.params.id);

    if(order) {
        if(order.user) {
            res.status(403);
            throw new Error("This is a Order's Registered User You're Not Allowed")
        }

        if(order.status === 'Waiting Payment') {
            order.status = 'Cancelled'
            await order.save();
            res.json({message: 'Successfully Cancelled your Order'})
        } else {
            res.status(400).json({messsage: `Cannot Cancel You Order Because Order is Already: ${order.status}`})
        }
    } else {
        res.status(404);
        throw new Error("Order Can't be Found!")
    }
});

// DELETE order for registered user
const deleteOrders = asynchandler(async(req, res)=> {
    const order = await Order.findById(req.params.id);
    if (order) {
        if(order.user && order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                res.status(401);
                throw new Error('Not Allowed to Delete this order');
        };
        await order.deleteOne();
        res.json({message: 'Order Deleted'});
    } else {
        res.status(404);
        res.json({message: 'Cannot Found Orders!'})
    }
});

const deleteOrdersGuest = asynchandler(async(req, res)=> {
    const order = await Order.findById(req.params.id);

    if(order) {
        if(order.user) {
            res.status(403);
            throw new Error("This is a Order's Registered User You're Not Allowed")
        };
        await order.deleteOne();
        res.json({message: 'Order Deleted'});
    } else {
        res.status(404);
        res.json({message: 'Cannot Found Orders!'})
    }
})

// POST MidtransWebHook
const handleMidtransWebhook =  asynchandler(async(req, res)=> {
    const notificationJson = req.body;

    let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY
    });

    const statusResponse = await snap.transaction.notification(notificationJson);
    let orderId = statusResponse.order_id;
    let transactionStatus =  statusResponse.transaction_status;
    let fraudStatus = statusResponse.fraud_status;

    console.log(`Notifikasi diterima untuk Order ID ${orderId}: Transaction Status: ${transactionStatus}, Fraud Status: ${fraudStatus}`);

    const order = await Order.findById(orderId);

    if (order) {
        if(transactionStatus == 'capture' || transactionStatus == 'settlement') {
            if(fraudStatus == 'accept') {
                order.status = 'Waiting To Be Confirmed'
                order.paymentResult = {
                    transaction_id: statusResponse.transaction_id,
                    payment_type: statusResponse.payment_type,
                    status_message: statusResponse.status_message,
                    transaction_time: statusResponse.transaction_time,
                }
            }
        } else if (transactionStatus == 'deny' || transactionStatus == 'expire' || transactionStatus == 'cancel') {
            order.status = 'Cancelled'
        }

        await order.save()
    }

    res.status(200).send('OK');
});

// POST order Midtrans
const createMidtransOrder =  asynchandler(async(req, res)=> {
    const {
        orderItems,
        customerDetails,
        pickupDetails,
        paymentMethod,
        taxPrice,
        totalPrice,
    } = req.body;

    if(!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error('No Items in Your Order') 
    }

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
        status: 'Waiting For Payment'
    });

    const createOrder = await order.save();

    let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY
    });

    const itemDetailsForMidtrans =  createOrder.orderItems.map(item=>({
        id: item.product,
        price: item.price,
        quantity: item.quantity,
        name: item.name,
    }));

    if (createOrder.taxPrice > 0) {
        itemDetailsForMidtrans.push({
            id: 'PPN10',
            price: createOrder.taxPrice,
            quantity: 1,
            name: 'PPN (10%)'
        });
    }

    let parameter = {
        "transaction_details": {
            "order_id": createOrder._id,
            "gross_amount": createOrder.totalPrice
        },
        "item_details": itemDetailsForMidtrans,
        "customer_details": {
            "first_name": createOrder.customerDetails.name,
            "phone": createOrder.customerDetails.phone
        },
    };

    const midtransToken =  await snap.createTransactionToken(parameter);

    res.status(201).json({
        order: createOrder,
        midtransToken: midtransToken
    });
});

    
// POST order Cash
const cashOrder = asynchandler(async(req,res)=> {
    const {
        orderItems,
        customerDetails,
        pickupDetails,
        paymentMethod,
        taxPrice,
        totalPrice,
    } = req.body;

    if(!orderItems && orderItems.length === 0) {
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
            status: 'Waiting To Be Confirmed'
        });

        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
});


// POST Id user yang gak kedaftar akun nya 
const getGuestOrders = asynchandler(async (req, res) => {
    const { orderIds } = req.body;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
        return res.json([]);
    }

    const orders = await Order.find({ 
        '_id': { $in: orderIds },
        'user': null 
    });

    res.json(orders);
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


export{cashOrder, getGuestOrders, deleteOrders, deleteOrdersGuest, guestCancelOrder, cancelOrder, handleMidtransWebhook, createMidtransOrder, getOrderById, getMyOrders, getAllOrders, updateOrderStatus}