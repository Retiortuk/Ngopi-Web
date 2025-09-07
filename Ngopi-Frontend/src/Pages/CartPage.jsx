import React from "react";
import { Link, useLocation } from "react-router-dom";
import { userCartStore } from "../stores/userCartStore.js";
import styles from "./CartPage.module.css";


const TrashIcon = () => (
    // <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
    //     <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm-1 .722.789 9.861a1 1 0 0 1-.995 1.117h-6.23a1 1 0 0 1-.994-1.117L4.722 3.222zM7.5 5.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m3 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5" />
    // </svg>
    // <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#ffffff" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#ffffff" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ffffff" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    <svg width="21px" height="21px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#474747" stroke-width="1.7759999999999998" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#474747" stroke-width="1.7759999999999998" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#474747" stroke-width="1.7759999999999998" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#474747" stroke-width="1.7759999999999998" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#474747" stroke-width="1.7759999999999998" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
);

export const OrderSummary = ({subtotal, totalFinall, taxCount, taxRate, showBackLink}) => {
    const location = useLocation();
    const isOnCartPage = location.pathname === '/cart';

    if(showBackLink) {
        return (
            <div className="card shadow-sm border-0">
                <div className="card-body p-3">
                    {/* Rincian Harga */}
                    <div className="mb-2">
                        <div className="d-flex justify-content-between">
                            <small className="text-muted">Subtotal</small>
                            <small className="text-muted">Rp{new Intl.NumberFormat('id-ID').format(subtotal)}</small>
                        </div>
                        <div className="d-flex justify-content-between">
                            <small className="text-muted">Diskon</small>
                            <small className="text-success">-Rp.0</small>
                        </div>
                        <div className="d-flex justify-content-between">
                            <small className="text-muted">PPN ({taxRate}%)</small>
                            <small className="text-muted">Rp{new Intl.NumberFormat('id-ID').format(taxCount)}</small>
                        </div>
                        {isOnCartPage && (
                            <div className="dropdown mt-2">
                                <button className="btn btn-sm btn-dark dropdown-toggle" id="dropdownDiscount" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Select Discount %
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownDiscount">
                                    <li><button className="dropdown-item" type="button">No Discount Available :(</button></li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <hr className="my-2" />
                    
                    {/* Tombol Aksi */}
                    <div className="d-flex justify-content-between align-items-center">
                        {/* Tombol Kembali (Kiri) */}
                        {isOnCartPage ? (
                            <Link to="/" className="btn btn-outline-secondary p-2">
                                <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                                <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                                </svg>
                            </Link>
                        ): (
                            <Link to="/cart" className="btn btn-outline-secondary p-2">
                                <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                                <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                                </svg>
                            </Link>
                        )}
                        {/* Total dan Tombol Checkout (Kanan) */}
                        <div className="d-flex align-items-center">
                            <div className="text-center">
                                <small className="text-muted d-block">Total</small>
                                <p className="fw-bold h5 mb-0">Rp{new Intl.NumberFormat('id-ID').format(totalFinall)}</p>
                            </div>
                        </div>
                        {isOnCartPage ? (
                            <Link to='/checkout' className="text-decoration-none">
                                <button type="button" className="btn btn-dark">Checkout</button>
                            </Link>
                        ):(
                            <Link to='/order' className="text-decoration-none">
                                <button type="button" className="btn btn-dark">Order</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <h4 className="card-title mb-4">Your Summary Order</h4>
                <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted">Subtotal</p>
                    <p className="fw-bold">Rp.{new Intl.NumberFormat('id-ID').format(subtotal)}</p>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted">Discount</p>
                    <p className="fw-bold text-success">-Rp.0</p>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted">PPN ({taxRate}%)</p>
                    <p className="fw-bold">Rp.{new Intl.NumberFormat('id-ID').format(taxCount)}</p>
                </div>
                {/* Discount Hanya Muncul di CartPage */}
                {isOnCartPage && (
                    <div className="dropdown">
                        <button className="btn btn-sm btn-dark dropdown-toggle" id="dropdownDiscount" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Select Discount %
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownDiscount">
                            <li><button className="dropdown-item" type="button">No Discount Available :(</button></li>
                        </ul>
                    </div>
                )}
                <hr />
                <div className="d-flex justify-content-between fw-bold mt-3">
                    <p>Total</p>
                    <p>Rp.{new Intl.NumberFormat('id-ID').format(totalFinall)}</p>
                </div>
                {isOnCartPage ? (
                    <Link to='/checkout' className="d-grid mt-2 text-decoration-none">
                        <button type="button" className="btn btn-dark">Checkout</button>
                    </Link>
                ): (
                    <Link to='/order' className="d-grid mt-2 text-decoration-none">
                        <button type="button" className="btn btn-dark">Order</button>
                    </Link>
                )}
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

    return  (
        <div className="container py-4" style={{fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
            <div className="row">
                
                {/* CART */}
                <div className={`col-lg-8 mb-4  ${styles.cartListMobile}`}>
                    <h2 className="mb-1 mt-lg-4">Your Cart ({cart.length})</h2>
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
                                        <img src={item.image} className="img-fluid rounded-3" alt="Items Pict" style={{ width: '75px' }} />
        
                                        {/* NAMA ITEM DAN HARGA */}
                                        <div className="ms-3 flex-grow-1">
                                            <h5 className="mb-1 fs-6 fs-md-5">{item.title}</h5>
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
                    <div className="d-none d-lg-block">
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