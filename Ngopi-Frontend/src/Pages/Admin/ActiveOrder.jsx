import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import OrderCardAdmin from "../../components/Admin/OrderCardAdmin.jsx";
import OrderCardSkeleton from "../../components/OrderCardSkeleton.jsx";
import { useAdminOrderStore } from "../../stores/adminOrderStore.js";



function ActiveOrder () {
    const {user} = useAuth();

    const {orders, isLoading, fetchOrders} = useAdminOrderStore();

    useEffect(()=> {
        fetchOrders();
    },[fetchOrders]);

    const ongoingOrders = orders.filter(
        (order) => order.status === 'Waiting To Be Confirmed' || order.status === 'Preparing'
    );

    const readyToPickup = orders.filter(
        (order) => order.status === 'Ready To Pickup'
    );
    
    return (
        <>
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
                                <OrderCardAdmin key={order._id} order={order} onUpdate={fetchOrders} />
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
                                <OrderCardAdmin key={order._id} order={order} onUpdate={fetchOrders} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ActiveOrder;