import React from "react";
import OrderCardItem from "../../Pages/OrderCardItem.jsx";

const getStatusBadge = (status) => {
    const lowerCaseStatus = status.toLowerCase();
    if (lowerCaseStatus.includes('finished')) {
        return 'bg-success';
    }
    if (lowerCaseStatus.includes('cancelled')) {
        return 'bg-danger';
    }
    return 'bg-secondary';
};

function HistoryOrderCard ({ order }) {


    const formattedDate = new Intl.DateTimeFormat('en-EN', {
        dateStyle: 'long',
        timeStyle: 'short'
    }).format(new Date(order.createdAt));


    return (
        <>
            <div className="card border-1 shadow-sm mb-4">
                <div className="card-header bg-white d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                        <h6 className="mb-0 fw-bold">#{order._id.slice(-6).toUpperCase()} - {order.customerDetails.name}</h6>
                        <small className="text-muted">{formattedDate} &bull; Pickup: {order.pickupDetails.time}</small>
                    </div>
                    {order.user?.name ? (
                        <small className="text-muted mt-2 mt-md-0">Orderer: {order.user.name}</small>
                    ) : (
                        <span className="fw-bold mt-2 mt-md-0">Rp{new Intl.NumberFormat('id-ID').format(order.totalPrice)}</span>
                    )}
                </div>

                <div className="card-body py-2">
                    {order.orderItems.map((item, index) => (
                        <OrderCardItem key={index} item={item} />
                    ))}
                </div>

                    {order.status === 'Cancelled' ? (
                        <div className="card-footer d-flex justify-content-end gap-2">
                            
                            <span className={`badge ${getStatusBadge(order.status)}`}>{order.status}</span>
                        </div>
                        
                    ): (
                        <div className="card-footer d-flex justify-content-between gap-2">
                            <span className={`text-muted`}>Paid By: {order.paymentMethod}</span>
                            <span className={`badge ${getStatusBadge(order.status)}`}>{order.status}</span>
                        </div>
                        

                    )}
            </div>
        </>
    )
};

export default HistoryOrderCard;