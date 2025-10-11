# Ngopi-Web-App-System

<br>

<h2 style="text-align:center; font-style:italic;">
     ----- SYSTEM DOCUMENTATION -----
</h2>

---


##### About Project:
<p>This Project Was Created Using <a href='https://www.mongodb.com/resources/languages/mern-stack'><u>MERN</u></a> Stack, This Project Based On My Own Problem, It is Always being my Dream to have a FNB Caffe Store so technically I created a system for my FNB Caffe Store so once I Opened My FNB Store It Won't become a problems anymore because I had the system and I know the flow of the system, Because I'm the one who Created it.  </p>

<br>

##### What is MERN Stack and Why?:
<p>MERN Stack Based On MongoDB, ExpressJS, ReactJS, NodeJS You Can Learn More About it Here <a href="https://www.mongodb.com/resources/languages/mern-stack" style='font-style:italic;'>MERN</a>, Using MERN stack Is Really Fit on this system because it is so easy to manage For the development of the Ngopi web application, I have selected the MERN stack, a powerful and modern combination of technologies perfect for building high-performance web applications. The MERN stack consists of four key components:</p>

- **MongoDB**: A flexible, document-based NoSQL database.
- **Express.js**: A back-end web application framework for Node.js.
- **React**: A front-end JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime environment that executes code on the server.

<p>here are <strong>4 Reasons</strong> Why Do I used a MERN Stack:</p>

<!-- 1 -->
<p><strong>1. Seamless Development with a Single Language: JavaScript</strong></p>
<p>One of the most significant advantages of the MERN stack is that the entire application, from the user interface (front-end) to the server logic (back-end), is written in JavaScript.</p>

- ***Without Being Said***:  I can work more efficiently without switching between different programming languages. This consistency reduces complexity and speeds up the development of new features, like adding a new coffee blend to your menu or creating a loyalty points system.

<!-- 2 -->
<p><strong>2. Fast And Interactive UX With React</strong></p>
<p>A coffee app should feel as smooth and responsive as a perfect espresso shot. React allows me to build a dynamic single-page application (SPA).</p>

- ***Without Being Said***: When a user clicks to view different coffee origins, checks their order status, the page updates instantly without a full reload. This creates a seamless, app-like experience in the browser, keeping users engaged and happy.

<!-- 3 -->
<p><strong>3. Flexibility for Evolving Features with MongoDB</strong></p>
<p>MongoDB is a NoSQL database that stores data in JSON-like documents, which means we don't have to define a rigid structure from the start.</p>

- ***Without Being Said***: if I decide to add new information to coffee profiles—like acidity levels, brewing recommendations, or admin-submitted photos—we can do so easily without complex database migrations. This is perfect for an app that needs to grow and adapt.

<!-- 4 -->
<p><strong>4. High Performance and Scalability with Node.js and Express.js</strong></p>
<p>MongoDB is a NoSQL database that stores data in JSON-like documents, which means we don't have to define a rigid structure from the start.</p>

- ***Without Being Said***: Whether you have ten users or ten thousand users ordering their morning coffee at the same time, the app will remain fast and responsive. This ensures a reliable experience even during peak hours, preventing lost sales and frustrated customers.

<br>

<h3 style="text-align:center;">
    List Of Contents
</h3>

* ***[1. Front-End Documentation](#front-end-documentation)***
* ***[2. User/Developer Flow Documentation](#--userdeveloper-flow-documentation)***
* ***[3. Using MidTrans Pay Simulator](#front-end-documentation)***
* ***[4. Back-End Documentation](#front-end-documentation)***
* ***[5. API Documentation](#front-end-documentation)***

---
## Front-End Documentation


### - User/Developer Flow Documentation

<p>Visit The Website on <a href="https://ngopi-frontend.vercel.app/"><u>Ngopi</u></a></p>

<br>

#### HomePage

![HomePage](/md-asset/Ngopi-HomePage.png)

<!-- Homepage -->
<p>In this Home Page User Can <strong>View Their Carts, make an Order, View History, Tracking Their Orders, Login, Logout.</strong></p>

<br>

#### 1st Case: User Wants Order
<p>To Order User Doesn't has to create an account or logged in but there is something that user Can't do if user not logged in or registered User Can't View Their History Of Their Orders.</p>

**User Select Their Desired Items:**
![user select item](/md-asset/user-select-item.png)

<p>User Can Add How Much qty They Want With Button Control + for Add More item and - For delete of the previous item</p>

<p style="font-style:italic;"><strong>Snippet Code For Control Quantity and Send It to Cart:</strong></p>
<p style="font-style:italic;">ProductCard.jsx</p>

```jsx
    function ProductCard({ product }) {
        const {cart, addToCart, removeFromCart} = userCartStore();
        const productInCart = cart.find(item => item._id === product._id);
        const quantityInCart = productInCart ? productInCart.quantity : 0;
        // Add To Cart
        const handleAddToCart = () => {
            if(quantityInCart === 0) {
                toast.success(`${product.name} Added To Cart`, {
                    style: {
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: '16px',
                        borderRadius: '5px',
                        background: '#212529',
                        color: '#fff',
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#212529'
                        }
                    },
                });
            }
            addToCart(product)
        };
        // Remove From Cart
        const handleRemoveFromCart = () => {
            if(quantityInCart === 1) {
                toast.error(`"${product.name}" Removed From Cart`, {
                    style: {
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: '16px',
                        borderRadius: '5px',
                        background: '#212529',
                        color: '#fff',
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#212529'
                        }
                    },
                });
            }
            removeFromCart(product)
        }

        return(
            <div className={`d-flex align-items-center gap-1 gap-sm-2 ${styles.quantityControls}`}>
                <button className="btn btn-danger btn-sm" onClick={handleRemoveFromCart}>-</button>
                <span className="fw-bold">{quantityInCart}</span>
                <button className="btn btn-dark btn-sm" onClick={handleAddToCart}>+</button>
            </div>
        )
    }
```
<br>

<p style="font-style:italic;">userCartStore.js</p>

```javascript
import { create } from "zustand";

const getInitialCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const userCartStore = create((set) => ({
    cart: getInitialCart(),

    addToCart: (product) => {
        set((state) => {
            const existingProduct =  state.cart.find((item) => item._id === product._id);
            let updatedCart

            if(existingProduct) {
                updatedCart = state.cart.map((item)=> item._id === product._id ? {...item, quantity: (item.quantity || 1) + 1} : item);
            } else {
                updatedCart = [...state.cart, {...product, quantity : 1}];
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return { cart : updatedCart}
        });
    },

    removeFromCart: (product) => {
        set((state) => {
            const existingProduct = state.cart.find((item) => item._id === product._id);
            let updatedCart;

            if(!existingProduct) { //jika memang cart sudah kosong
                return state;
            }

            if(existingProduct.quantity === 1) {
                updatedCart =  state.cart.filter((item) => item._id !== product._id);
            } else {
                updatedCart = state.cart.map((item) => item._id === product._id ? {...item, quantity: item.quantity - 1 }: item)
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return { cart: updatedCart};
        });
    },
}));

```

<br>

**User View Their Selected Items in Cart:**
![cart](/md-asset/cart.png)

<p>User Can View and also can control their items, also can checkout their items when checkout clicked it will continue to the next page that is Checkout Page</p>

<p style="font-style:italic;"><strong>Snippet Code For View Cart Includes Cart.jsx And userCartStore.js:</strong></p>

<p style="font-style:italic;">Cart.jsx</p>

```jsx
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
```
<br>

<p style="font-style:italic;">userCartStore.js</p>

```javascript

import { create } from "zustand";

const getInitialCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const userCartStore = create((set) => ({
    cart: getInitialCart(),

    addToCart: (product) => {
        set((state) => {
            const existingProduct =  state.cart.find((item) => item._id === product._id);
            let updatedCart

            if(existingProduct) {
                updatedCart = state.cart.map((item)=> item._id === product._id ? {...item, quantity: (item.quantity || 1) + 1} : item);
            } else {
                updatedCart = [...state.cart, {...product, quantity : 1}];
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return { cart : updatedCart}
        });
    },

    removeFromCart: (product) => {
        set((state) => {
            const existingProduct = state.cart.find((item) => item._id === product._id);
            let updatedCart;

            if(!existingProduct) { //jika memang cart sudah kosong
                return state;
            }

            if(existingProduct.quantity === 1) {
                updatedCart =  state.cart.filter((item) => item._id !== product._id);
            } else {
                updatedCart = state.cart.map((item) => item._id === product._id ? {...item, quantity: item.quantity - 1 }: item)
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return { cart: updatedCart};
        });
    },
    
    clearItemFromCart: (product) => {
        set((state)=> {
            const updatedCart =  state.cart.filter((item) => item._id !== product._id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return {cart: updatedCart}
        })
    },

    clearCart: () => {
        set(()=> {
            localStorage.removeItem('cart');
            return {cart: []};
        })
    }
}));
```
<br>

**User Checkout Their Items:**
![cart](/md-asset/checkoutPage.png)

<p>in This Page User Can Add Note For Admin/Kitchen also user capable to edit or delete notes before orders been sent to the kitchen/admin</p>

![cart](/md-asset/addNote.png)


<p style="font-style:italic;"><strong>Snippet Code For View Cart Includes Cart.jsx And userCartStore.js:</strong></p>

<p style="font-style:italic;">Cart.jsx</p>


