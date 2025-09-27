import React from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import styles from './AdminLayout.module.css';
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleToggleSidebar = () => setShowSidebar(!showSidebar);
    const handleCloseSidebar = () => setShowSidebar(false);

    return (
        <div className={styles.adminLayout}>
            <AdminSidebar 
                show={showSidebar} 
                handleClose={handleCloseSidebar} 
            />
            
            <div className={styles.mainContent}>
                <header className="bg-light shadow-sm p-3 d-flex justify-content-between align-items-center">
                    
                    <button className="btn d-lg-none" type="button" onClick={handleToggleSidebar}>
                        <i className="bi bi-list fs-4"></i>
                    </button>

                    <h2 className="h4 mb-0 ms-2 ms-lg-0" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Ngopi.</h2>
                    
                    <button className="btn btn-link text-dark">
                        <i className="bi bi-bell-fill fs-5"></i>
                    </button>
                </header>
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    )
};

export default AdminLayout;