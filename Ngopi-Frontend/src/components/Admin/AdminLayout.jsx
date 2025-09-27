import React from "react";
import { Outlet, Link } from "react-router-dom";
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
                <header className={`bg-light shadow-sm p-3 d-flex justify-content-between align-items-center ${styles.header}`}>
                    
                    <button className="btn d-lg-none" type="button" onClick={handleToggleSidebar}>
                        <i className="bi bi-list fs-4"></i>
                    </button>

                    <Link to='/' className="text-dark text-decoration-none">
                        <h2 className="h4 mb-0 ms-2 ms-lg-0" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Ngopi.</h2>
                    </Link>
                    
                    <button className="btn btn-link text-dark">
                        <i className="bi bi-bell-fill fs-5"></i>
                    </button>
                </header>
                <main className={styles.contentArea} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    <div className="p-4">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
};

export default AdminLayout;