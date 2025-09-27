import React, { useEffect, useState } from "react";
import SummaryCard from "../../components/Admin/SummaryCard.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";
import apiClient from "../../api/axiosConfig.js";


function AdminDashboard() {
    const [summaryData, setSummaryData] = useState({
        totalEarnings: 0,
        totalProducts: 0,
        activeOrders: [],
        futureOrders: []
    });
    const [isLoading, setIsLoading] = useState(true)
    const {user} = useAuth();

    useEffect(()=> {
        const fetchSummaryData = async()=> {
            try {
                const [summaryRes, activeOrdersRes, futureOrdersRes] = await Promise.all([
                    apiClient.get('/orders/dashboard-info'),
                    apiClient.get('/orders/active-orders'),
                    apiClient.get('/orders/future-orders'),
                ])
                setSummaryData({
                    totalEarnings: summaryRes.data.totalEarnings,
                    totalProducts: summaryRes.data.totalProducts,
                    activeOrders: activeOrdersRes.data,
                    futureOrders: futureOrdersRes.data,
                })
                setIsLoading(false)
            } catch(error) {
                console.error("Failed To Fetch Summary Data:", error);
                setIsLoading(false)
            }
        }
        fetchSummaryData();
    },[]);

    return(
        <div>
            <h1 className="h2 mb-1">Dashboard</h1>
            <p className="text-muted mb-4">Hello Admin {user.name}!</p>
            <div className="row g-4">
                <div className="col-md-6">
                    
                    <SummaryCard
                        title="Total Earnings"
                        value={`Rp ${new Intl.NumberFormat('id-ID').format(summaryData.totalEarnings)}`}
                        isLoading={isLoading} 
                    />
                </div>
                <div className="col-md-6">
                    <Link to='/admin/manage-stock' className="text-decoration-none">
                        <SummaryCard
                            title="Available Stock"
                            value={summaryData.totalProducts}
                            isLoading={isLoading} 
                        />
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link to='/admin/active-orders' className="text-decoration-none">
                        <SummaryCard
                            title="Active Orders"
                            value={summaryData.activeOrders.length}
                            isLoading={isLoading} 
                        />
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link to='/admin/future-orders' className="text-decoration-none">
                        <SummaryCard
                            title="Future Orders"
                            value={summaryData.futureOrders.length}
                            isLoading={isLoading} 
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;