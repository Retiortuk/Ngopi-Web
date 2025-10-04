import React, {useState} from "react";
import OrderCardItem from "../../Pages/OrderCardItem.jsx";
import apiClient from "../../api/axiosConfig.js";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import  Modal  from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";


function FutureOrderCard ({ order, onUpdate }) {
    const location = useLocation();
    const isFuturePage = location.pathname === '/admin/future/orders';

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleCloseConfirmModal = () => setShowConfirmModal(false);
    const handleShowConfirmModal = () => {
        setShowConfirmModal(true); 
    };
    
    const formattedDate = new Intl.DateTimeFormat('en-EN', {
        dateStyle: 'long',
        timeStyle: 'short'
    }).format(new Date(order.createdAt));

    const handleUpdatePickup = async(newPickupTime)=> {
        try {
            await apiClient.put(`/orders/updatePickupTime/${order._id}`, {time: newPickupTime});
            toast.success(`Order #${order._id.slice(-4)} Updated!`);
            onUpdate();
        } catch (error) {
            toast.error('Failed To Update Status')
            console.error('Something Wrong:', error);
        }
    };

    const handleCancel = async () => {
        try {
            await apiClient.put(`/orders/${order._id}/status`, { status: 'Dibatalkan' });
            toast.success(`Orders #${order._id.slice(-4)} is Cancelled.`);
            onUpdate();
        } catch (error) {
            toast.error("Failed To Reject Orders.");
        }
    };

    return (
        <>
        <div className="card border-1 shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center flex-wrap">
                <div>
                    <h6 className="mb-0 fw-bold">#{order._id.slice(-6).toUpperCase()} - {order.customerDetails.name}</h6>
                    <small className="text-muted">{formattedDate} &bull; Pickup: {order.pickupDetails.time}</small>
                </div>
            </div>

            <div className="card-body py-2">
                {order.orderItems.map((item, index) => (
                    <OrderCardItem key={index} item={item} />
                ))}
            </div>

            <div className="card-footer d-flex justify-content-end gap-2">
                { order.status === 'Waiting To Be Confirmed' &&  (
                    <>
                        <button className="btn btn-outline-danger" onClick={() => handleCancel('Cancelled')}>Reject</button>
                        <button className="btn btn-dark" onClick={handleShowConfirmModal}>
                            Make It as Pickup: Now
                        </button>
                    </>
                )}
            </div>
        </div>

        <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered size="">
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are You sure want to change the order Pickup Time to be "Now"?</p>
                    <p className="small text-muted">This Action will move Future Orders to "Ongoing Orders" And You Have To Confirm it Again in Active Orders Page Make Sure The Customer is Here Already.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseConfirmModal}>
                        No
                    </Button>
                    <Button variant="dark" onClick={() => handleUpdatePickup('Now')}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default FutureOrderCard;