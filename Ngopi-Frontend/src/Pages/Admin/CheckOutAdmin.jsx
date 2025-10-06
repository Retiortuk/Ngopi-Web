import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userCartStore } from "../../stores/userCartStore.js";
import {useAuth} from "../../contexts/AuthContext.jsx";
import { OrderSummary } from "../CartPage.jsx";
import { generatePickupTimes } from "../../utils/timeHelper.js";
import styles from "../CartPage.module.css";
import radioStyles from "../CheckOutPage.module.css"
import CheckOutItem from "../CheckOutItem.jsx";
import CashPaymentModal from "../../components/Admin/CashPaymentModal.jsx";
import logoQRIS from "../../images/Payment/Midtrans.png";
import toast from "react-hot-toast";
import apiClient from "../../api/axiosConfig.js";


const paymentMethods = [
    { id: 'cash', name: 'Pay at Cashier', logoSrc: null },
    {id: 'online', name: 'Online Payment', logoSrc: logoQRIS },
];

function CheckOutAdmin() {
        const pickupTimes = generatePickupTimes();
        const {cart, clearCart} = userCartStore();
        const {user, isAuthenticated} = useAuth();
        const navigate = useNavigate();

        const initialPickupTimes = pickupTimes[0]?.disabled ? '' : pickupTimes[0]?.times || '';

        // State Untuk Form
        const [customerName, setCustomerName] = useState(user?.name || '');
        const [customerPhone, setCustomerPhone] = useState('');
        const [notes, setNotes] = useState({});
        const [selectedPayment, setSelectedPayment] = useState('')
        const [selectedPickupTimes, setSelectedPickupTimes] = useState(initialPickupTimes);
        const [isLoading, setIsLoading] = useState(false);

        const [showCashModal, setShowCashModal] = useState(false);
        const [orderDataToSubmit, setOrderDataToSubmit] = useState(null);

        // PPN Dan Total
        let taxRate = 10;
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const taxCount = subtotal * (taxRate/100);
        const totalFinall = subtotal + taxCount

        const saveGuestOrderId = (orderId) => {
            const guestOrderIds = JSON.parse(localStorage.getItem('guestOrderIds')) || [];
            guestOrderIds.push(orderId);
            localStorage.setItem('guestOrderIds', JSON.stringify(guestOrderIds));
        };

        const handleNoteChange = (productId, note) => {
            setNotes(prevNotes => ({
                ...prevNotes,
                [productId]: note,
            }));
        };

        const handleMidtransOrder = async (orderData) => {
            setIsLoading(true);
            try {
                const {data: responseData} = await apiClient.post('/orders/online', orderData); 
                const midtransToken = responseData.midtransToken;
                const createdOrder = responseData.order;
    
                    window.snap.pay(midtransToken, {
                        onSuccess: function(result) {
                            toast.success("Payment Successfully!")
                            if(!isAuthenticated) {saveGuestOrderId(createdOrder._id)}
                            clearCart();
                            navigate('/admin/active-orders');
                        },
                        onPending: function(result) {
                            toast("Waiting For Your Payment");
                            if(!isAuthenticated) {saveGuestOrderId(createdOrder._id)}
                            clearCart();
                            navigate(`/admin/active-orders`);
                        },
                        onError: function(result) {
                            toast.error("Payment Failed")
                        },
                        onClose: function() {
                            toast.error("You Close The Payment Popup")
                            if(isAuthenticated) {
                                apiClient.put(`/orders/${createdOrder._id}/cancel`)
                                apiClient.delete(`/orders/delete-order/${createdOrder._id}`)
                            } else {
                                apiClient.put(`/orders/${createdOrder._id}/guest-cancel`)
                                apiClient.delete(`/orders/delete-order-guest/${createdOrder._id}`)
                            }
                        }
                    });
            } catch (error) {
                console.error('Failed To Process The Order:', error);
                const errorMessage = error.response?.data?.message || "Failed To Proccess Your Order!";
                toast.error(errorMessage);
            } finally {
                setIsLoading(false)
            }
        };

        const handleCashOrder = async (orderData) => {
            setIsLoading(true);
            try {
                const {data: responseData} = await apiClient.post('/orders/cash-order', orderData);
                toast.success("Your Order Has Been Sent!");
                if(!isAuthenticated) {saveGuestOrderId(responseData._id)}
                clearCart();
                navigate(`/admin/active-orders`);
            } catch (error) {
                console.error('Failed To Process The Order:', error);
                const errorMessage = error.response?.data?.message || "Failed To Proccess Your Order!";
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
                setShowCashModal(false);
            }
        }

        const handleOrderSubmit = async () => {
            // Validasi User :)
            if(pickupTimes[0]?.disabled) {
                return toast.error('Store is Closed!');
            }
            if(!customerName) {
                return toast.error('Name Required!');
            }
            if(!selectedPickupTimes) {
                return toast.error('Pickup The Available Times!')
            }
            if(!selectedPayment) {
                return toast.error('Choose Your Payment!')

            }

            setIsLoading(true);
            
            const orderData = {
                customerDetails: {name: customerName, phone: customerPhone},
                orderItems: cart.map(item=> ({
                    name: item.name,
                    quantity: item.quantity,
                    image: item.image,
                    price: item.price,
                    product: item._id,
                    note: notes[item._id] || ''
                })),
                pickupDetails: { type: 'Pickup', time: selectedPickupTimes},
                paymentMethod: selectedPayment,
                taxPrice: taxCount,
                totalPrice: totalFinall
            };

            setOrderDataToSubmit(orderData)

            try {
                if(selectedPayment === 'online') {
                    await handleMidtransOrder(orderData);
                } else if (selectedPayment === 'cash') {
                    setShowCashModal(true);
                }
            } catch (error) {
                console.error('Failed to Create Your Order:', error);
                const errorMessage = error.response?.data?.message || "Failed to Proccess Your Order!";
                toast.error(errorMessage);
            } finally {
                setIsLoading(false)
            }
        }
    
        return  (
            <>
                <div className="container py-4" style={{fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
                    <div className="row">
                        
                        {/* ORDERS */}
                        <div className={`col-lg-8 mb-4 ${styles.cartListMobile}`}>
                            <h4 className="mb-1 mt-lg-4">Your Orders ({cart.length})</h4>
                            
                            {cart.length === 0 ? (
                                <div className="alert alert-secondary mt-3">
                                    No Order! Something Wrong <Link to='/admin/manual-order' className="text-dark">Let's Ngopi!</Link>
                                </div>
                            ): (
                                cart.map((item)=> (
                                    <CheckOutItem key={item._id} item={item} noteValue={notes[item._id] || ''} onNoteChange={handleNoteChange} />
                                ))
                            )}

                            {cart.length > 0 && (
                                <>
                                    {/* DATA CUSTOMER */}
                                    <h4 className="mb-md-1 mt-4">Orders Detail</h4>
                                    <div className="card shadow-sm border-0 mt-4">
                                        <div className="card-body">
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="name" className="form-label fw-bold">Orderer's Name</label>
                                                    <input type="text" className="form-control" id="name" value={customerName} onChange={(e)=> setCustomerName(e.target.value)} required />
                                                    <div className="form-text">This is Your Name for Your Coffee or Item.</div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    
                                    {/* PICKUP TIMES */}
                                    <div className="card shadow-sm border-0 mt-4">
                                        <div className="card-body">
                                            <h5 className="card-title mb-4">Pickup Times</h5>
                                            {pickupTimes.map((pickup) => (
                                                <div key={pickup.times} className="form-check mb-4">
                                                    <input 
                                                        className={`form-check-input ${radioStyles.formCheckInputDark}`}
                                                        type="radio" 
                                                        name="pickupTimes" 
                                                        id={`pickup-${pickup.times}`}
                                                        checked={selectedPickupTimes === pickup.times}
                                                        onChange={() => setSelectedPickupTimes(pickup.times)}
                                                        disabled={pickup.disabled}
                                                    />
                                                    <label className="form-check-label w-100" htmlFor={`pickup-${pickup.times}`}>
                                                        <div>
                                                            <span>{pickup.times}</span>
                                                            {pickup.description && (
                                                                <small className="form-text text-muted d-block mt-1">{pickup.description}</small>
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* PAYMENT METHOD */}
                                    <div className="card shadow-sm border-0 mt-4">
                                        <div className="card-body">
                                            <h5 className="card-title mb-4">Payment Method</h5>
                                            {paymentMethods.map((method) => (
                                                <div key={method.id} className="form-check mb-4">
                                                    <input 
                                                        className={`form-check-input ${radioStyles.formCheckInputDark}`}
                                                        type="radio" 
                                                        name="paymentMethod" 
                                                        id={`payment-${method.id}`}
                                                        checked={selectedPayment === method.id}
                                                        onChange={() => setSelectedPayment(method.id)}
                                                        required
                                                    />
                                                    <label className="form-check-label w-100" htmlFor={`payment-${method.id}`}>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span>{method.name}</span>
                                                            {method.logoSrc && (
                                                                <img src={method.logoSrc} alt={`${method.name} logo`} style={{ height: '24px' }} />
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* ----------------------------------------------------------------- */}

                            <div className="d-none d-lg-block mt-4">
                                <Link to="/admin/manual-order" className="text-dark text-decoration-none">
                                    &larr; Back To Menus
                                </Link>
                            </div>
                        </div>
                        
                        {cart.length > 0 && (
                            <>
                                {/* SUMMARY ONLY IN DESKTOP*/}
                                <div className="col-lg-4 d-none d-lg-block mt-4">
                                    <div className="position-sticky" style={{ top: '120px' }}>
                                        <OrderSummary subtotal={subtotal} totalFinall={totalFinall} taxCount={taxCount} taxRate={taxRate} onOrder={handleOrderSubmit} isLoading={isLoading} />
                                    </div>
                                </div>
                                {/* ONLY IN MOBILE */}
                                <div className="d-lg-none">
                                    <div className="card shadow-lg border-0 position-fixed bottom-0 start-0 end-0" style={{zIndex: 1030}}>
                                        <OrderSummary subtotal={subtotal} totalFinall={totalFinall} taxCount={taxCount} taxRate={taxRate} showBackLink={true} onOrder={handleOrderSubmit} isLoading={isLoading} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <CashPaymentModal 
                    show={showCashModal}
                    onHide={() => setShowCashModal(false)}
                    totalAmount={totalFinall}
                    onConfirm={()=> {
                        if(orderDataToSubmit) {
                            handleCashOrder(orderDataToSubmit)
                        }
                    }}
                />
            </>
        )
};

export default CheckOutAdmin;