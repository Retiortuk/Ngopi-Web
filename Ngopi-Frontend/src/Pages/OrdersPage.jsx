import React, { useEffect } from "react";
import { useState } from "react";
import OrderCard from "./OrderCard.jsx";
import kopiSusuImg from "../images/kopi-susu.webp";
import spicyBulgogiImg from "../images/spicy-bulgogi.webp";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import apiClient from "../api/axiosConfig.js";


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

    if(isLoading) {
        return <div className="container py-4 text-center">Loading Your Orders...</div>;
    }
    return(
        <div className="container py-4">
            <div className="row">
                <div className="col-12">
                    <h4 className="mb-3 mt-lg-4">Your Order Tracking ({orders.length})</h4>

                    {orders.length === 0 ? (
                        <div className="alert alert-secondary mt-3">
                            No Order So far, <Link to='/' className="text-dark">Let's Ngopi!</Link>
                        </div>
                    ): (
                        orders.map((order)=> (
                            <OrderCard key={order._id} order={order} />
                        ))
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

export default OrdersPage;