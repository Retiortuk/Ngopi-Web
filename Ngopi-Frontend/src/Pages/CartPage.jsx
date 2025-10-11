import React from "react";
import { Link, useLocation } from "react-router-dom";
import { userCartStore } from "../stores/userCartStore.js";
import styles from "./CartPage.module.css";


const TrashIcon = () => (
    <svg width="21px" height="21px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#474747" strokeWidth="1.7759999999999998" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 11V17" stroke="#474747" strokeWidth="1.7759999999999998" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#474747" strokeWidth="1.7759999999999998" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#474747" strokeWidth="1.7759999999999998" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#474747" strokeWidth="1.7759999999999998" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
);

export const OrderSummary = ({subtotal, totalFinall, taxCount, taxRate, showBackLink, onOrder, isLoading}) => {
    const location = useLocation();
    const isOnCartPage = location.pathname === '/cart';

    const ActionButton = () => {
        if (isOnCartPage) {
            return (
                <Link to='/checkout' className="d-grid text-decoration-none">
                    <button type="button" className="btn btn-dark btn-lg">Checkout</button>
                </Link>
            );
        } else {
            return (
                <div className="d-grid">
                    <button 
                        type="button" 
                        className="btn btn-dark btn-lg" 
                        onClick={onOrder} 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Order'}
                    </button>
                </div>
            );
        }
    };

    // --- Tampilan Mobile ---
    if (showBackLink) {
        return (
            <div className="card shadow-sm border-0 p-3">
                <div className="card-body p-3">
                    <div className="mb-2">
                        <div className="d-flex justify-content-between">
                            <small className="text-muted">Subtotal</small>
                            <small>Rp{new Intl.NumberFormat('id-ID').format(subtotal)}</small>
                        </div>
                        <div className="d-flex justify-content-between">
                            <small className="text-muted">PPN ({taxRate}%)</small>
                            <small>Rp{new Intl.NumberFormat('id-ID').format(taxCount)}</small>
                        </div>
                    </div>
                    <hr className="my-2" />
                    
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="text-start">
                            <small className="text-muted d-block">Total Purchase</small>
                            <p className="fw-bold h5 mb-0">Rp{new Intl.NumberFormat('id-ID').format(totalFinall)}</p>
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <ActionButton />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    // --- Tampilan Desktop ---
    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <h4 className="card-title mb-4">Order Summary</h4>
                <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted">Subtotal</p>
                    <p className="fw-bold">Rp.{new Intl.NumberFormat('id-ID').format(subtotal)}</p>
                </div>
                {/* --- TAMBAHKAN RINCIAN PAJAK DI SINI (UNTUK DESKTOP) --- */}
                <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted">PPN ({taxRate}%)</p>
                    <p className="fw-bold">Rp.{new Intl.NumberFormat('id-ID').format(taxCount)}</p>
                </div>
                {/* ---------------------------------------------------- */}
                <hr />
                <div className="d-flex justify-content-between fw-bold mt-3">
                    <p>Total</p>
                    <p>Rp.{new Intl.NumberFormat('id-ID').format(totalFinall)}</p>
                </div>
                <div className="mt-4">
                    <ActionButton />
                </div>
            </div>
        </div>
    )
}
    


function CartPage() {
    const {cart, addToCart, removeFromCart, clearItemFromCart } = userCartStore();
    let taxRate = 10;
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxCount = subtotal * (taxRate/100);
    const totalFinall = subtotal + taxCount

    const imageUrl = `${import.meta.env.VITE_API_BASE_URL}`
    return  (
        <div className="container py-4" style={{fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
            <div className="row">
                
                {/* CART */}
                <div className={`col-lg-8 mb-4  ${styles.cartListMobile}`}>
                    <h4 className="mb-1 mt-lg-4">Your Cart ({cart.length})</h4>
                    {/* Cek Apakah Cart Kosong? */}
                    {cart.length === 0 ? (
                            <div className="alert alert-secondary mt-3">
                                Your Cart is Empty <Link to='/' className="text-dark">Let's Ngopi!</Link>
                            </div>
                    ): (
                        cart.map((item)=> (
                            // CART ITEMS START ---------
                            <div className="card mb-2 border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        {/* GAMBAR ITEM */}
                                        <img src={imageUrl + item.image} className="img-fluid rounded-3" alt="Items Pict" style={{ width: '75px' }} />
        
                                        {/* NAMA ITEM DAN HARGA */}
                                        <div className="ms-3 flex-grow-1">
                                            <h5 className="mb-1 fs-6 fs-md-5">{item.name}</h5>
                                            <p className="small mb-0 text-muted fw-semibold fs-7">Rp{new Intl.NumberFormat('id-ID').format(item.price)}</p>
                                        </div>
        
                                        {/* CONTROL QTY */}
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-danger btn-sm p-1 p-md-2" onClick={() => removeFromCart(item)} type="button">-</button>
                                            <input type="text" className="form-control text-center mx-2 p-1 p-md-2" value={item.quantity} readOnly style={{ width: '40px' }} />
                                            <button className="btn btn-dark btn-sm p-1 p-md-2" onClick={()=> addToCart(item)} type="button">+</button>
                                        </div>
        
                                        {/* DELETE ITEM */}
                                        <button className="btn btn-sm ms-2 ms-md-3 p-1" onClick={()=> clearItemFromCart(item)}><TrashIcon /></button>
                                    </div>
                                </div>
                            </div>
                            // CART ITEMS END ------
                        ))
                    )}
                    <div>
                        <Link to="/" className="text-dark text-decoration-none mt-4 d-inline-block">
                            &larr; Back To Home
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
}

export default CartPage;