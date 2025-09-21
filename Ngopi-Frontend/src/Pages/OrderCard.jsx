import React from "react";
import OrderCardItem from "./OrderCardItem.jsx";


function OrderCard ({ order }) {
    const formattedDate = new Intl.DateTimeFormat('en-EN', {
        dateStyle: 'long',
        timeStyle: 'short'
    }).format(new Date(order.createdAt));

    const getStatusColor = (status) => {
        const lowerCaseStatus = status.toLowerCase();

        if(lowerCaseStatus.includes('ready to pickup') || lowerCaseStatus.includes('preparing')) {
            return 'fw-bold text-success';
        }
        if(lowerCaseStatus.includes('cancelled') || lowerCaseStatus.includes('failed') || lowerCaseStatus.includes('expired')) {
            return 'fw-bold text-danger';
        }
        if(lowerCaseStatus.includes('finished')) {
            return 'text-dark-emphasis'
        }
        return 'fw-bold text-danger-emphasis'

    }

    return (
        <div className="card border-1 shadow-sm mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h6 className="mb-0">Order ID: #{order._id.slice(-6).toUpperCase()}</h6>
                    <small className="text-muted">{formattedDate}</small>
                </div>
                <span className="fw-bold">Rp{new Intl.NumberFormat('id-ID').format(order.totalPrice)}</span>
            </div>
            <div className="card-body">
                {order.orderItems.map((item) => (
                    <div key={item._id} className="mb-2">
                        <OrderCardItem  item={item} />
                    </div>
                ))}
            </div>
            <div className="card-footer text-end">
                <p className="mb-0 text-muted">
                    Status: <span className= {getStatusColor(order.status)}>{order.status}</span>
                </p>
            </div>
        </div>
    )
};

export default OrderCard;