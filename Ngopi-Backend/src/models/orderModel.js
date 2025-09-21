import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    customerDetails: {
        name: {type: String, required: true},
        phone: {type: String, required: true},
    },
    orderItems: [
        {
            name: {type: String, required: true},
            quantity: {type: Number, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            note: {type: String, required: false},
            product: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}
        },
    ],
    pickupDetails: {
        type: {type: String, required: true, default: 'Pickup'},
        time: {type: String, required: true}
    },
    paymentMethod: {type: String, required: true},
    paymentResult: {
        transaction_id: { type: String },
        payment_type: { type: String }, 
        status_message: { type: String },
        transaction_time: { type: String },
    },
    taxPrice: {type: Number, required: true, default: 0.0},
    totalPrice: {type: Number, required: true, default: 0.0},
    status: {type: String, required: true, default: 'Waiting For Payment'},
},
    {timestamps: true}
)
const Order =  mongoose.model('Order', orderSchema);
export default Order;