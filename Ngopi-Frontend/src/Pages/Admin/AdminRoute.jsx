import React from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
    const {isAuthenticated, user, loading } = useAuth();

    if(loading) {
        return <div className="text-center py-5">Cheking Access....</div>;
    }

    return isAuthenticated && user.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
    
};

export default AdminRoute;