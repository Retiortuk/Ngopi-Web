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
* ***[3. 1st Case User Wants to Order](#1st-case-user-wants-order)***
* ***[4. 2nd Case User Wants to Track The Order](#2nd-case-user-wants-to-track-the-orders)***
* ***[5. 3rd Case: Login/Register](#3rd-case-user-wants-to-login-or-create-account)***
* ***[6. 4th Case User Wants to View History](#4th-case-user-wants-to-view-their-history)***
* ***[7. Using MidTrans Pay Simulator](#midtrans-payment-simulator)***
* ***[8. Admin/Developer Flow Documentation](#--admindeveloper-flow-documentation)***
* ***[9. Back-End Documentation](#front-end-documentation)***
* ***[10. API Documentation](#front-end-documentation)***

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

### 1st Case: User Wants Order
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
                <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted">PPN ({taxRate}%)</p>
                    <p className="fw-bold">Rp.{new Intl.NumberFormat('id-ID').format(taxCount)}</p>
                </div>
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

**Add Note**

<p>in This Page User Can Add Note For Admin/Kitchen also user capable to edit or delete notes before orders been sent to the kitchen/admin</p>

![cart](/md-asset/addNote.png)

<br>

**Fill Details And Are Required Nothing is Optional**
<p>Also User Must Fill The Orders Detail Such As Orderer's Name And Their Phone Numbers it is required if it is not filled then user cannot Order the items/continue the orders</p>

![cart](/md-asset/handler_required.png)

<br>

**Pickup Times**

<p>User Must Pick The Available Pickup Times From "Now" To up 4 hours During Operational Store, "Now" Means User Already At The Store And The Orders will be processing immediately And Will Be Ready To Pickup Soon As Possible</p>

![pickupTimes](/md-asset/pickup-time.png)

<p style="font-style:italic;"><strong>Snippet Code For Pickup Times:</strong></p>

<p style="font-style:italic;">timeHelper.js</p>

```javascript
export function generatePickupTimes() {
    // Inisialisasi Waktu Sekarang (local)
    const now =  new Date();
    // Slot Waktu yang tersedia akan masuk kesini
    const availableSlots = [];

    // Start Open Toko
    const startTime = new Date();
    startTime.setHours(8, 30, 0, 0);

    // Close Toko
    const endTime = new Date();
    endTime.setHours(21, 0, 0, 0);

    // Check if now > endTime(Toko tutup)
    if (now > endTime || now < startTime) {
        return[{times: 'Our Store Closed', disabled: true}]
    }

    // Waktu Sekarang dalam range startTime - endTime
    let currentSlotTime = new Date(startTime);

    while (currentSlotTime <= endTime) {
        if(currentSlotTime > now) {
            const hours = String(currentSlotTime.getHours()).padStart(2, '0');
            const minutes = String(currentSlotTime.getMinutes()).padStart(2, '0');
            availableSlots.push({times: `${hours}:${minutes}`})
        }
        currentSlotTime.setMinutes(currentSlotTime.getMinutes() + 30);
    }

    // push ke array yang sebenarnya
    const finalPickupTimes = [
        {
            times:'Now',
            description: "By Choosing this means you're at the store, and ready to pickup when your order called"
        },
        ...availableSlots.slice(0,4)
    ];
    return finalPickupTimes;
}
```

<p style="font-style:italic;">CheckOutPage.jsx</p>

```jsx
import { generatePickupTimes } from "../utils/timeHelper.js";

function CheckOutPage() {
    const pickupTimes = generatePickupTimes();
    const initialPickupTimes = pickupTimes[0]?.disabled ? '' : pickupTimes[0]?.times || '';
    const [selectedPickupTimes, setSelectedPickupTimes] = useState(initialPickupTimes);

    return (
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
    )
}
```

<br>
<br>

**Payment Methods**
<p>There Are 2 Options For Payment Method, Cash And Online Payment, First Cash, cash is user pay in front the cashier user can choose other methods than cash in cashier, Online Payment is User Can Pay Online Using QRIS, Virtual Account, etc.., This System Used MidTrans As a Payment GateAway</p>

<p>Payment Method: Cash</p>

![payment](/md-asset/payment_cash.png)

<p>Payment Method: Online Using MidTrans as a Payment Gateaway</p>

![payment](/md-asset/payment_online.png)

**When User Order And Choose Online Payment**
<p>When Order Button Pressed Frontend Will Call Midtrans API In Our System <a href ="https://docs.midtrans.com/">Learn More About MidTrans Flow Here For Developer</a></p>

<p style="font-style:italic;"><strong>Snippet Code For MidTrans API Being Called :</strong></p>

<p style="font-style:italic;">CheckOutPage.jsx</p>

```jsx
function CheckOutPage() {
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
                            navigate('/orders');
                        },
                        onPending: function(result) {
                            toast("Waiting For Your Payment");
                            if(!isAuthenticated) {saveGuestOrderId(createdOrder._id)}
                            clearCart();
                            navigate(`/orders`);
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
}
```

<p>Frontend MidTrans Does ask for MidTrans Token to Backend</p>

<p style="font-style:italic;"><strong>Snippet Code For Backend Send Token to Frontend :</strong></p>

<p style="font-style:italic;">orderController.js</p>

```javascript
const createMidtransOrder = asyncHandler(async(req, res)=> {
     const {
        orderItems,
        customerDetails,
        pickupDetails,
        paymentMethod,
        taxPrice,
        totalPrice,
    } = req.body;

     const order = new Order({
        user: req.user ? req.user._id : null,
        orderItems: orderItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            note: item.note,
            product: item.product
        })),
        customerDetails,
        pickupDetails,
        paymentMethod,
        taxPrice,
        totalPrice,
        status: 'Waiting For Payment'
    });

    const createOrder = await order.save();

    // CREATE TOKEN
    const midtransToken =  await snap.createTransactionToken(parameter);

    req.io.emit('newOrder', createOrder);
    res.status(201).json({
        order: createOrder,
        midtransToken: midtransToken
    });
});
```
<br>

<p>When Token Successfully Received By Frontend Then It will pop up embed by MidTrans To Select Available Online Payment Methods</p>

![online-midtrans](/md-asset/embed-midtrans.png)

<br>
<p>Just Quick Example Here User Choose <strong>QRIS</strong> as a Payment Method</p>

![qris](/md-asset/qris.png)

<p><strong>How To Pay It?</strong> currently you cannot scan the QRIS because My MidTrans still in Development SandBox, To Make it not in Development I have to submit the details the data of my business which the FNB Store is Not Ready yet. so to make it work You Have to use <a href="https://simulator.sandbox.midtrans.com/"> MidTrans Payment Simulator </a></p>

<br>

##### MidTrans Payment Simulator
<p>Copy The Image Address Of Your QRIS's QR, Visit <a href="https://simulator.sandbox.midtrans.com/">Midtrans Payment Simulator</a> Select Your Payment Method as Example Here is a QRIS and paste your QRIS image Address </p>

![qris](/md-asset/midtransPaymentsim.png)

<p>Click "Scan QR" and "Paid"</p>

![payment-success](/md-asset/payment-success.png)

<p>And That's It Payment successful and user Done</p>

<br>
<br>

### 2nd Case: User Wants To Track The Orders
<p>Actually if user just order something and the payment is sucessfully it will navigate user to orders page to track the orders but if you are in the home page, click the user icon logo and select "Orders"</p>

![users-Modal](/md-asset/users-modal.png)

<br>

**Orders Page**
<p>in this page where users tracking their orders where status Orders are <strong>"Waiting To Be Confirmed"</strong> it means user orders has been successfully Post to the Admin but admin has not yet accept the order if Admin has not yet accept the order more than 35 Minutes the order automatically Being <strong>"Cancelled"</strong> and it wont show up in Orders Page it will move to History Page, if Admin Accept The Order then status will Changed From "Waiting To Be Confirmed" To <strong>"Preparing"</strong> Once The Preparing is Done and The Orders is Ready the status will changed from "Preparing" to <strong>"Ready To Pickup"</strong>, and if user picked up the orders admin will changed order status from "Ready To Pickup" to <strong>"Finished"</strong> also Finished Status won't show up in Orders Page it will be move to History Page. </p>

![orders-page](/md-asset/orders-page.png)

<p style="font-style:italic;"><strong>Snippet Code For Get User Orders :</strong></p>

<p style="font-style:italic;">OrdersPage.jsx</p>

```jsx
import React, { useEffect } from "react";
import { useState } from "react";
import OrderCard from "./OrderCard.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import apiClient from "../api/axiosConfig.js";
import OrderCardSkeleton from "../components/OrderCardSkeleton.jsx";


function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isAuthenticated, user} =  useAuth();
    

    useEffect(()=> {
        const fetchOrders = async ()=> {
            try {
                let response;
                if(isAuthenticated) {
                    console.log('Taking Orders Data From Database...');
                    response = await apiClient.get('/orders/myOrder');
                    setOrders(response.data)
                } else {
                    const guestOrderIds = JSON.parse(localStorage.getItem('guestOrderIds')) || [];
                    if(guestOrderIds.length > 0) {
                        response = await apiClient.post('/orders/guest', { orderIds: guestOrderIds });
                        setOrders(response.data);
                    } else {
                        setOrders([]);
                    }
                }
            } catch (error) {
                console.error("Failed To Fetch Orders Data:", error);
                toast.error("Cannot Fetch Orders Data.");
                setOrders([]); 
            } finally {
                setIsLoading(false);
            }
        }
        fetchOrders();
    },[isAuthenticated]);

    const activeStatuses = ['Waiting To Be Confirmed', 'Waiting For Payment', 'Preparing', 'Ready To Pickup'];
    const activeOrders = orders.filter(order=> activeStatuses.includes(order.status));

    return(
        <div className="container py-4">
            <div className="row">
                <div className="col-12">
                    <h4 className="mb-3 mt-lg-4">Your Order Tracking ({activeOrders.length})</h4>
                    {isLoading ? (
                        <>
                            <OrderCardSkeleton />
                            <OrderCardSkeleton />
                            <OrderCardSkeleton />
                        </>
                    ): activeOrders.length === 0 ? (
                        <div className="alert alert-secondary mt-3">
                            No Active Order So far, <Link to='/' className="text-dark">Let's Ngopi!</Link>
                        </div>
                    ): (   

                        <div className="d-grid gap-3">
                            {activeOrders.map((order)=> (
                                <OrderCard key={order._id} order={order} />
                            ))}
                        </div>
                        
                    )}

                    <div>
                        <Link to="/" className="text-dark text-decoration-none d-inline-block">
                            &larr; Back To Home
                        </Link>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default OrdersPage;
```

<br>
<br>

### 3rd Case: User Wants To Login or Create Account
<p>Some Features Are Not Accessible such as History Page if user not registered, or logged in Without being said Unregistered user cannot view their order's history, so in The Home Page Click user Icon Logo and select <strong>"Login"</strong>.</p>

![users-Modal](/md-asset/login-click.png)

<br>

**Login Page**
<p>in this page user can logged in with their account if they have an account if user unregistered user can click <strong>Register</strong> it will take user to Register Page.</p>

![loginpage](/md-asset/loginpage.png)

**Register Page**

![register](/md-asset/registerPage.png)

<p style="font-style:italic;"><strong>Snippet Code For Login Page And Register :</strong></p>

<p style="font-style:italic;">LoginPage.jsx</p>

```jsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import toast from "react-hot-toast";

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('You Must Input All The Fields');
            return ;
        }
        try {
            const loggedInUser = await login(email, password);
            toast.success(`Welcome To Ngopi! ${loggedInUser.name}`);
            if (loggedInUser.isAdmin) {
                navigate('/admin/dashboard')
            } else {
                navigate('/');
            }
        } catch(error) {
            console.error('Failed To Login', error);
            const errorMessage = error.response?.data?.message || 'Something Wrong Cant Log You in';
            toast.error(errorMessage);
        }
    };


    return(
        <div className="d-flex vh-100 align-items-center justify-content-center bg-light" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            
            <div className="bg-white p-5 rounded-4 shadow" style={{width: '100%', maxWidth: '450px'}}>
                <div className="text-center mb-4">
                    <Link to="/" className="h2 fw-bold text-dark text-decoration-none">
                        Ngopi.
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* EMAIL */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email" 
                            id="email"
                            className="form-control form-control-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="position-relative">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="password"
                                className="form-control form-control-sm"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                placeholder=""
                                required
                            />
                            <button
                                type="button"
                                onClick={()=> setShowPassword(!showPassword)}
                                className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent text-muted"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.94 5.94 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.288.822.822.083.083.083.083a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 6.854-12-12 .708-.708 12 12-.708.708z"/>
                                    </svg>
                                ): (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                    </svg>
                                )}
                            </button>

                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <small className="text-muted">Don't have an account? 
                            <Link to="/register" className="text-decoration-underline text-dark fw-semibold"> Register </Link>
                        </small>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn btn-dark w-100">
                                Login
                            </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
```

<p style="font-style:italic;">RegisterPage.jsx</p>

```jsx
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import toast from "react-hot-toast";

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {register} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Cek Kalo Masih kosong gk boleh daftar
        if (!name || !email || !password) {
            toast.error('You Must Input all The Fields');
            return;
        }
        if (password.length < 6) {
            toast.error('Password Needs At Least 6 Characters!');
            return;
        }

        try {
            const guestOrderIds = JSON.parse(localStorage.getItem('guestOrderIds')) || [];
            await register(name, email, password, guestOrderIds);
            if(guestOrderIds.length > 0) {
                localStorage.removeItem('guestOrderIds')
            }
            toast.success("You're Registered! Login to Continue!");
            navigate('/login');
        } catch (error) {
            console.error('Failed To Register', error);
            const errorMessage = error.response?.data?.message || 'Registered Failed, Please Try Again!';
            toast.error(errorMessage);
        }
    };
    return(
        <div className="d-flex vh-100 align-items-center justify-content-center bg-light" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            
            <div className="bg-white p-5 rounded-4 shadow" style={{width: '100%', maxWidth: '450px'}}>
                <div className="text-center mb-4">
                    <Link to="/" className="h2 fw-bold text-dark text-decoration-none">
                        Ngopi.
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>

                    {/* NAMA */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Your Name
                        </label>
                        <input
                            type="text" 
                            id="name"
                            className="form-control form-control-sm"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            placeholder=""
                            required
                            />
                    </div>
                    
                    {/* EMAIL */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email" 
                            id="email"
                            className="form-control form-control-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="position-relative">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="password"
                                className="form-control form-control-sm fst-italic"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=""
                                required
                            />
                            <button
                                type="button"
                                onClick={()=> setShowPassword(!showPassword)}
                                className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent text-muted"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.94 5.94 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.288.822.822.083.083.083.083a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 6.854-12-12 .708-.708 12 12-.708.708z"/>
                                    </svg>
                                ): (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                    </svg>
                                )}
                            </button>

                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <small className="text-muted">Already have an account? 
                            <Link to="/login" className="text-decoration-underline text-dark fw-semibold"> Login </Link>
                        </small>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn btn-dark w-100">
                                Register
                            </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
```
<br>
<br>

### 4th Case: User Wants To View Their History
<p>before view history in History Page make sure that user/you have to registered or logged in if not then this page will apppear</p>

![login-req](/md-asset/login-required.png)

<br>

<p>to go to History Orders Click Icon User Logo then Select "History"</p>

![users-Modal](/md-asset/login-click.png)

<br>

<p>if you're registered and Logged in user/you can view History, in History Page includes the order that has order status <strong>"Finsihed"</strong> or <strong>"Cancelled"</strong></p>

![history-page](/md-asset/history-page.png)

<p style="font-style:italic;"><strong>Snippet Code For Get User History:</strong></p>

<p style="font-style:italic;">HistoryPage.jsx</p>

```jsx
import React, { useEffect, useCallback, useState } from "react";
import OrderCardSkeleton from "../components/OrderCardSkeleton.jsx";
import HistoryOrderCard from "../components/Admin/HistoryOrderCard.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import apiClient from "../api/axiosConfig.js";
import toast from "react-hot-toast";


function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isAuthenticated, user} = useAuth();

    

    useEffect(()=> {
        const fetchHistory = async () => {
            if(!isAuthenticated) {
                return;
            }
            try {
                const {data} = await apiClient.get(`/orders/Myhistory/${user._id}`);
                setHistory(data);
            } catch (error) {
                console.error("Failed To Fetch History: Error:", error);
                toast.error('Failed To Load History');
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    },[]);


    return(
        <div className="container py-4">
            <div className="row">
                <div className="col-12">
                    {/* History Only for Registered User */}
                    {isAuthenticated ? (
                        <>  
                            <h4 className="mb-3 mt-lg-4">Your History ({history.length})</h4>

                            {isLoading ? (
                                <>
                                    <OrderCardSkeleton />
                                    <OrderCardSkeleton />
                                </>

                            ): history.length === 0 ? (
                                <div className="alert alert-secondary mt-3">
                                    No History So far, <Link to='/' className="text-dark">Let's Ngopi!</Link>
                                </div>
                            ): (
                                history.map((order)=> (
                                    <HistoryOrderCard key={order._id} order={order} />
                                ))
                            )}
                        </>
                    ) : (
                        <div className="alert alert-secondary mt-3">
                            Login to See Your History, <Link to='/login' className="text-dark">Let's Login!</Link>
                        </div>
                    )}
                    <div className="d-none d-lg-block">
                            <Link to="/" className="text-dark text-decoration-none d-inline-block">
                                &larr; Back To Home
                            </Link>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default HistoryPage;
```
<br>
<br>

### - Admin/Developer Flow Documentation

<br>

#### Admin Dashboard

<br>

![adminDashboard](/md-asset/dashboard-admin.png)

<!-- Homepage -->
<p>In this Admin Dashboard Page an Admin Can see The Summary From <strong>The Total Earnings, Available Stock, Active Orders, Future Orders</strong>, also admin can <strong>Sign Out.</strong></p>

<br>

### 1st Case: Admin Wants To Manage Stock CRUD
<p>navigate to Manage Stock Page To Get There you can click "Available Stock" On Admin Dahsboard Page, Or You can Click Manage Stock on sidebar</p>

<br>

#### Manage Stock Page
![manageStock](/md-asset/manage-stock.png)
<p>In this Page Admin Can do a <strong>CRUD</strong> Create, Read, Update, Delete. Click "Edit" then it will Popup Dropdown.</p>

![edit](/md-asset/edit-dropdown.png)
<p>There are <strong>Edit Menu, Delete Menu, Marked As Sold Out</strong>.</p>

<br>

**Admin Wants To Edit Menu**
<p>After The Dropdown Appeared Admin Select "Edit Menu" then a Modal will pop up</p>

![edit-produt](/md-asset/Edit-product.png)
<p>Here an Admin Can <strong>Change The Name of The Product , Product Price, make the product be as a Featured Product</strong></p>

<p style="font-style:italic;"><strong>Snippet Code For: Edit Menu</strong></p>

<p style="font-style:italic;">EditProductModal.jsx</p>

```jsx
function EditProductModal({show, onHide, product, onUpdate}) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price.toString());
            setIsFeatured(product.isFeatured);
        }
    }, [product]);

    const handleSave = async (e) => {
        e.preventDefault();

        const priceNumber =  Number(price);
        if(!priceNumber || priceNumber <= 0) {
            toast.error("Price Cannot be Emptied Or Rp.0");
            return; 
        }
        try {
            const updatedData = { name, price : priceNumber, isFeatured };
            await apiClient.put(`/product/update/${product._id}`, updatedData);
            
            toast.success(`'${name}' success updated!.`);
            onUpdate(); 
            onHide();
        } catch (error) {
            toast.error("Failed to Update.");
            console.error("Error updating product:", error);
        }
    };

    if(!product) return null;
};
```

<br>

**Admin Wants To Delete Menu**

<p>On Dropdown Click <strong>"Delete Menu"</strong> then java script alert confirmation window will popup</p>

![delete-menu](/md-asset/delete-stock.png)
<p>Once admin press that ok on confirmation then it will delete the item</p>

<p style="font-style:italic;"><strong>Snippet Code For: Delete Menu</strong></p>

<p style="font-style:italic;">ManageCard.jsx</p>

```jsx
 const handleDeleteStock = async() => {
        if(window.confirm(`Are You Sure You Want To Delete ${product.name}? This Can't Be Cancelled`)) {
            try {
                await apiClient.delete(`/product/delete/${product._id}`);
                toast.success('Sucessfully Delete The Item');
            } catch (error) {
                toast.error('Cannot Delete The Item');
                console.error('Error Message:', error);
            }
        }
    };
```
<br>

**Marked As Sold Out/Available**
<p>when admin Click <strong>"Mark As Sold Out"</strong> it will update the stock to sold out or not available when it is Marked As Sold Out then admin can make it available again by click <strong>"Mark As Available"</strong></p>

![soldout](/md-asset/mark-as-soldout.png)

<p>also when the stock is sold out the item will not available to purchase either in user side or admin side</p>

<p style="font-style:italic;"><strong>Snippet Code For: Mark As Soldout/Available</strong></p>

<p style="font-style:italic;">ManageCard.jsx</p>

```jsx
<Dropdown.Menu>
    <Dropdown.Item onClick={handleEditPrice}>Edit Menu</Dropdown.Item>
    <Dropdown.Item onClick={handleDeleteStock}>Delete Menu</Dropdown.Item>
    <Dropdown.Item onClick={handleStockToggle}>
        {product.isAvailable ? 'Marked As Sold Out' : 'Mark As Available'}
    </Dropdown.Item>
</Dropdown.Menu>
```
<br>
<br>

### 2nd Case: Admin Wants To Do Manual Order
<p>navigate to Manual Order Page To Get There, this page used for admin when user order with offline way which comes to the store and order it manually</p>

<br>

#### Manual Order
![manual-order](/md-asset/manual-order.png)
<p>In this Page Admin Can do a <strong>Add Item</strong> according to what user/buyer wants, then click <strong>Checkout</strong>.</p>

![cekout](/md-asset/eckout.png)
<p>Same as regular user order here's the checkout page for admin must fill all the data once it done then click <strong>Order</strong>.</p>

<br>

**Where Does The Order Go?**
<p>All The Orders Are Showed Up in Active Orders, Future Orders Page.</p>

<br>
<br>

### 3rd Case: Admin Wants to Check Active Orders
<p>All The Orders Sent To Admin Where Pickup Times is <strong>"Now"</strong> or <strong>Less than 30 Minutes Before Pickup</strong>, it will show up here </p>

<br>

#### Active Orders





<br>
<br>

---

## Back-End Documentation





