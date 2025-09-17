import React, { useEffect } from "react";
import { useState } from "react";
import HistoryCard from "./HistoryCard.jsx";
import kopiSusuImg from "../images/kopi-susu.webp";
import spicyBulgogiImg from "../images/spicy-bulgogi.webp";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const mockOrders = [
    {
        _id: "65ecabf2a1d3f9b8c7a4b123",
        createdAt: "2025-09-08T10:00:00Z",
        totalAmount: 90000,
        status: "Finished",
        paymentMethod: "QRIS",
        items: [
            { 
                id: 'f2', 
                title: 'Milk Coffee', 
                price: 30000, 
                quantity: 2, 
                image: kopiSusuImg,
                note: ''
            
            },
            { 
                id: 'f2', 
                title: 'Arabica Coffee', 
                price: 30000, 
                quantity: 1, 
                image: kopiSusuImg,
            
            }
        ]
    },

    {
        _id: "65ecabf2a1d3f9b8c7a4b456",
        createdAt: "2025-09-08T10:05:00Z",
        totalAmount: 30000,
        status: "Finished",
        paymentMethod: "BNI VA",
        items: [
        { id: 'f4', title: 'Spicy Bulgogi Toast', price: 30000, quantity: 1, image: spicyBulgogiImg }
        ]
    }
];

function HistoryPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isAuthenticated} = useAuth();

    useEffect(()=> {
        setTimeout(()=> {
            setOrders(mockOrders);
            setIsLoading(false);
        }, 1000)
    },[]);

    if(isLoading) {
        return <div className="container py-4 text-center">Loading Your Orders...</div>;
    }
    return(
        <div className="container py-4">
            <div className="row">
                <div className="col-12">
                    {/* History Only for Registered User */}
                    {isAuthenticated ? (
                        <>
                            <h4 className="mb-3 mt-lg-4">Your History ({orders.length})</h4>

                            {orders.length === 0 ? (
                                <div className="alert alert-secondary mt-3">
                                    No History So far, <Link to='/' className="text-dark">Let's Ngopi!</Link>
                                </div>
                            ): (
                                orders.map((order)=> (
                                    <HistoryCard key={order._id} order={order} />
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