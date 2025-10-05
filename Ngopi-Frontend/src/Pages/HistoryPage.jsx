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