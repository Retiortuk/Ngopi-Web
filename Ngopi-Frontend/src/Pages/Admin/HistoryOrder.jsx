import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import OrderCardSkeleton from "../../components/OrderCardSkeleton.jsx";
import HistoryOrderCard from "../../components/Admin/HistoryOrderCard.jsx";
import apiClient from "../../api/axiosConfig.js";
import toast from "react-hot-toast";



function HistoryOrder() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useAuth();

    const fetchHistory = useCallback(async () => {
        setIsLoading(true);
        try {
            const endPoint = user?.isAdmin ? '/orders/history' : `/orders/Myhistory/${user._id}`;
            const { data } = await apiClient.get(endPoint);
            setHistory(data);
        } catch(error) {
            console.error('Failed To Fetch History: ', error);
            toast.error('Failed To Load History!')
        } finally {
            setIsLoading(false);
        }
    }, [user?.isAdmin]);

    useEffect(()=> {
        fetchHistory();
    }, [fetchHistory])
    
    return (
        <>
            <div className="row g-4">
                <div className="col-lg-12">
                    <h4 className="mb-3">History</h4>
                    <p className="text-muted mb-4">History Orders</p>
                    {isLoading ? (
                        <>
                            <OrderCardSkeleton />
                            <OrderCardSkeleton />
                        </>
                    ): history.length === 0 ? (
                        <div className="alert alert-secondary">
                            No History!
                        </div>
                    ): (
                        <div className="d-grid gap-3">
                            {history.map((order)=> (
                                <HistoryOrderCard key={order._id} order={order} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default HistoryOrder;