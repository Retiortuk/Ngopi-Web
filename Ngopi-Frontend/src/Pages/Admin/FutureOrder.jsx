import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import OrderCardSkeleton from "../../components/OrderCardSkeleton.jsx";
import { useAdminOrderStore } from "../../stores/adminOrderStore.js";
import FutureOrderCard from "../../components/Admin/FutureOrderCard.jsx";



function FutureOrder () {
    const {user} = useAuth();

    const {orders, isLoading, fetchFutureOrders} = useAdminOrderStore();

    useEffect(()=> {
        fetchFutureOrders();
    },[fetchFutureOrders]);

    
    return (
        <>
            <div className="row g-4">
                <div className="col-lg-12">
                    <h4 className="mb-3">Future Orders({orders.length})</h4>
                    <p className="text-muted mb-4">Future Orders You Might Need to prepare it.</p>
                    {isLoading ? (
                        <>
                            <OrderCardSkeleton />
                            <OrderCardSkeleton />
                        </>
                    ): orders.length === 0 ? (
                        <div className="alert alert-secondary">
                            No Order So far
                        </div>
                    ): (
                        <div className="d-grid gap-3">
                            {orders.map((order)=> (
                                <FutureOrderCard key={order._id} order={order} onUpdate={fetchFutureOrders} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default FutureOrder;