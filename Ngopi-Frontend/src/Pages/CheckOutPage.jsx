import React from "react";
import { Link } from "react-router-dom";
import { userCartStore } from "../stores/userCartStore.js";
import { OrderSummary } from "./CartPage.jsx";
import styles from "./CartPage.module.css";
import CheckOutItem from "./CheckOutItem.jsx";

function CheckOutPage() {
        const {cart} = userCartStore();

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
                        <h2 className="mb-1 mt-lg-4">Your Orders ({cart.length})</h2>
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