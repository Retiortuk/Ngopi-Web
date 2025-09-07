import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userCartStore } from "../stores/userCartStore.js";
import { OrderSummary } from "./CartPage.jsx";
import styles from "./CartPage.module.css";
import radioStyles from "./CheckOutPage.module.css"
import CheckOutItem from "./CheckOutItem.jsx";
import logoQRIS from "../images/Payment/QRIS_logo.svg";
import logoBNI from "../images/Payment/BNI_logo.svg";
import logoBCA from "../images/Payment/BCA_logo.svg";
import logoMandiri from "../images/Payment/Bank_Mandiri_logo.svg";


const paymentMethods = [
    {id: 'qris', name: 'QRIS', logoSrc: logoQRIS },
    { id: 'bni', name: 'BNI Virtual Account', logoSrc: logoBNI },
    { id: 'bca', name: 'BCA Virtual Account', logoSrc: logoBCA },
    { id: 'mandiri', name: 'Mandiri Virtual Account', logoSrc: logoMandiri },
    { id: 'store', name: 'Pay at Cashier', logoSrc: null },
];

function CheckOutPage() {
        const {cart} = userCartStore();
        const [selectedPayment, setSelectedPayment] = useState('qris')

        // PPN Dan Total
        let taxRate = 10;
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const taxCount = subtotal * (taxRate/100);
        const totalFinall = subtotal + taxCount
    
        return  (
            <div className="container py-4" style={{fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
                <div className="row">
                    
                    {/* ORDERS */}
                    <div className={`col-lg-8 mb-4  ${styles.cartListMobile}`}>
                        <h4 className="mb-1 mt-lg-4">Your Orders ({cart.length})</h4>
                        {/* Cek Apakah Cart Kosong? */}
                        {cart.length === 0 ? (
                                <div className="alert alert-secondary mt-3">
                                    No Order! Something Wrong <Link to='/' className="text-dark">Let's Ngopi!</Link>
                                </div>
                        ): (
                            cart.map((item)=> (
                                // CART ITEMS START ---------
                                <CheckOutItem key={item.id} item={item} />
                                // CART ITEMS END ------
                            ))
                        )}
                        <h4 className="mb-md-1 mt-4">Orders Detail</h4>
                        {/* DATA CUSTOMER------------------------------ */}
                        <div className="card shadow-sm border-0 mt-4">
                            <div className="card-body">
                                
                                <div className="align-items-center">
                                    <div className="form-customer">
                                        
                                        <form>
                                            <div className="mb-3">
                                                <h5>
                                                    <label for="name" className="form-label">Orderer's Name</label>
                                                </h5>
                                                <input type="name" class="form-control" id="name" required />
                                                <div className="form-text">This is Your Name for Your Coffee or Item.</div>
                                            </div>
                                            <div className="mb-3">
                                                <h5>
                                                    <label for="phone" className="form-label">Phone Number</label>
                                                </h5>
                                                <input type="phone" class="form-control" id="phone" required />
                                            </div>
                                        </form>

                                    </div>
                                </div>

                            </div>
                        </div>
                        {/*------------------------------------------- */}

                        {/* PAYMENT METHOD------------------------------ */}
                        <div className="card shadow-sm border-0 mt-4">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Payment Method</h5>
                                {paymentMethods.map((method) => (
                                <div key={method.id} className="form-check mb-5">
                                    <input 
                                        className={`form-check-input ${radioStyles.formCheckInputDark}`}
                                        type="radio" 
                                        name="paymentMethod" 
                                        id={`payment-${method.id}`}
                                        checked={selectedPayment === method.id}
                                        onChange={() => setSelectedPayment(method.id)}
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
                        {/*------------------------------------------- */}
                        <div className="d-none d-lg-block">
                            <Link to="/cart" className="text-dark text-decoration-none mt-4 d-inline-block">
                                &larr; Back To Carts
                            </Link>
                        </div>
                        
                    </div>
                    {cart.length > 0 && (
                        <>
                            {/* SUMMARY ONLY IN DESKTOP*/}
                            <div className="col-lg-4 d-none d-lg-block mt-4">
                                <div className="position-sticky" style={{ top: '120px' }}>
                                    <OrderSummary subtotal={subtotal} totalFinall={totalFinall} taxCount={taxCount} taxRate={taxRate} />
                                </div>
                            </div>
                            {/* ONLY IN MOBILE */}
                            <div className="d-lg-none">
                                <div className="card shadow-lg border-0 position-fixed bottom-0 start-0 end-0" style={{zIndex: 1030}}>
                                    <OrderSummary subtotal={subtotal} totalFinall={totalFinall} taxCount={taxCount} taxRate={taxRate} showBackLink={true} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
                
            </div>
        )
};

export default CheckOutPage;