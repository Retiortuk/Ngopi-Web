import React from "react";
import OrderCardItem from "../../Pages/OrderCardItem.jsx";
import apiClient from "../../api/axiosConfig.js";
import toast from "react-hot-toast";

const getStatusBadge = (status) => {
    const lowerCaseStatus = status.toLowerCase();
    switch (true) {
        case lowerCaseStatus.includes('waiting to be confirmed'):
            return 'bg-warning text-dark';
        case lowerCaseStatus.includes('preparing'):
            return 'bg-info text-dark';
        case lowerCaseStatus.includes('ready to pickup'):
            return 'bg-success';
        case lowerCaseStatus.includes('finished'):
            return 'bg-success';
        case lowerCaseStatus.includes('cancelled'):
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
};

function OrderCardAdmin ({ order, onUpdate }) {
    const formattedDate = new Intl.DateTimeFormat('en-EN', {
        dateStyle: 'long',
        timeStyle: 'short'
    }).format(new Date(order.createdAt));

    const handleUpdateStatus = async(newStatus)=> {
        try {
            await apiClient.put(`/orders/updateOrder/${order._id}`, {status: newStatus});
            toast.success(`Order #${order._id.slice(-4)} Updated!`);
            onUpdate();
        } catch (error) {
            toast.error('Failed To Update Status')
            console.error('Something Wrong:', error);
        }
    };
    // TODO APPLY THIS IN CHECKOUT PAGE FOR USER
    return (
        <div className="card border-1 shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center flex-wrap">
                <div>
                    <h6 className="mb-0 fw-bold">#{order._id.slice(-6).toUpperCase()} - {order.customerDetails.name}</h6>
                    <small className="text-muted">{formattedDate} &bull; Pickup: {order.pickupDetails.time}</small>
                </div>
                <span className={`badge ${getStatusBadge(order.status)}`}>{order.status}</span>
            </div>

            <div className="card-body py-2">
                {order.orderItems.map((item, index) => (
                    <OrderCardItem key={index} item={item} />
                ))}
            </div>

            <div className="card-footer d-flex justify-content-end gap-2">
                {order.status === 'Waiting To Be Confirmed' && (
                    <>
                        <button className="btn btn-outline-danger" onClick={() => handleUpdateStatus('Cancelled')}>Reject</button>
                        <button className="btn btn-dark" onClick={() => handleUpdateStatus('Preparing')}>
                            Accept & Prepare it
                        </button>
                    </>
                )}
                {order.status === 'Preparing' && (
                    <button className="btn btn-dark" onClick={() => handleUpdateStatus('Ready To Pickup')}>
                        Ready To Pickup
                    </button>
                )}
                {order.status === 'Ready To Pickup' && (
                    <button className="btn btn-success" onClick={() => handleUpdateStatus('Finished')}>
                        Finished The Order
                    </button>
                )}
            </div>
        </div>
    )
};

export default OrderCardAdmin;