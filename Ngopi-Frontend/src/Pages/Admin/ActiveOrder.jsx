import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import OrderCard from "../OrderCard.jsx";
import OrderCardSkeleton from "../../components/OrderCardSkeleton.jsx";
import apiClient from "../../api/axiosConfig";
import toast from "react-hot-toast";



function ActiveOrder () {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useAuth();

    const fetchOrders = useCallback(async()=> {
        setIsLoading(true);
        try {
            const {data} = await apiClient.get('/orders/active-orders');
            setOrders(data);
            console.log('Succes Get The Data From DB');
        } catch (error) {
            console.error('Failed To Fetch Data:', error);
            toast.error("Failed To Get Orders Data")
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(()=> {
        setTimeout(()=> {
            fetchOrders();
        },1000);
    },[fetchOrders]);

    const ongoingOrders = orders.filter(
        (order) => order.status === 'Waiting To Be Confirmed' || order.status === 'Preparing'
    );

    const readyToPickup = orders.filter(
        (order) => order.status === 'Ready To Pickup'
    );
    
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h2 mb-1">Active Orders</h1>
                    <p className="text-muted mb-4">Take a Action on The Order ASAP.</p>
                </div>
            </div> 

            <div className="row g-4">
                {/* Active Orders Includes Status: Waiting To be Confirmed, Preparing */}
                <div className="col-lg-6">
                    <h4 className="mb-3">Ongoing Orders({ongoingOrders.length})</h4>
                    <p className="text-muted mb-4">Waiting To Be Confirmed & Preparing.</p>
                    {isLoading ? (
                        <>
                            <OrderCardSkeleton />
                            <OrderCardSkeleton />
                        </>
                    ): ongoingOrders.length === 0 ? (
                        <div className="alert alert-secondary">
                            No Order So far
                        </div>
                    ): (
                        <div className="d-grid gap-3">
                            {ongoingOrders.map((order)=> (
                                <OrderCard key={order._id} order={order} onUpdate={fetchOrders} />
                            ))}
                        </div>
                    )}
                </div>
            
                {/*  Ready To Pickup Status: Ready To Pickup */}
                <div className="col-lg-6">
                    <h4 className=" mb-3">Ready To Pickup({readyToPickup.length})</h4>
                    <p className="text-muted mb-4">Preparing Finished & Ready To Pickup.</p>

                    {isLoading ? (
                        <>
                            <OrderCardSkeleton />
                            <OrderCardSkeleton />
                        </>
                    ): readyToPickup.length === 0 ? (
                        <div className="alert alert-secondary">
                            No Orders Ready
                        </div>
                    ): (
                        <div className="d-grid gap-3">
                            {readyToPickup.map((order)=> (
                                <OrderCard key={order._id} order={order} onUpdate={fetchOrders} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ActiveOrder;