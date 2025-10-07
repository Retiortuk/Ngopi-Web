import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import styles from './AdminLayout.module.css';
import AdminSidebar from "./AdminSidebar";
import toast from "react-hot-toast";
import io from "socket.io-client";
import { useAdminOrderStore } from "../../stores/adminOrderStore.js";
import { Dropdown, Button } from "react-bootstrap";

// inisialisasi Buat IO Notifikasi Realtime
const socket = io('https://ngopi-backend.onrender.com');

const playNotificationSound = () => {
    if (window.Tone) {
        const synth = new window.Tone.Synth().toDestination();
        synth.triggerAttackRelease("E5", "8n");
    }
};

function AdminLayout() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const {addOrder} = useAdminOrderStore();

    const handleToggleSidebar = () => setShowSidebar(!showSidebar);
    const handleCloseSidebar = () => setShowSidebar(false);

    useEffect(()=> {
        socket.on('newOrder', (newOrderData)=> {
            console.log('New Order!:', newOrderData);

            toast.success(`New Order From ${newOrderData.customerDetails.name}!`, {
                duration: 10000,
                icon: "🔥"
            });
            playNotificationSound();
            setNotifications(prev => [{ ...newOrderData, read: false }, ...prev]);
            addOrder(newOrderData)
        });
        
        return()=> {
            socket.off('newOrder')
        };
    }, [addOrder]);

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    const unreadCount = notifications.filter(notif => !notif.read).length;

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
                    
                    <Dropdown>
                        <Dropdown.Toggle variant="link" className="text-dark p-0 position-relative">
                            <i className="bi bi-bell-fill fs-5"></i>
                            {unreadCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                    <span className="visually-hidden">New alerts</span>
                                </span>
                            )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end" className={styles.notificationMenu}>
                            <div className="px-3 py-2 d-flex justify-content-between align-items-center">
                                <h6 className="mb-0">Notification</h6>
                                {unreadCount > 0 && (
                                    <Button variant="link" size="sm" className="p-0 text-dark" onClick={handleMarkAllAsRead}>
                                        Mark As Read
                                    </Button>
                                )}
                            </div>
                            <Dropdown.Divider />
                            
                            {notifications.length === 0 ? (
                                <p className="text-muted text-center small p-3 mb-0">No New Notifications.</p>
                            ) : (
                                notifications.map(order => (
                                    <Dropdown.Item 
                                        key={order._id} 
                                        as={Link} 
                                        to="/admin/active-orders" 
                                        className={!order.read ? styles.unread : ''}
                                    >
                                        <img 
                                            src={`${import.meta.env.VITE_API_BASE_URL}${order.orderItems[0]?.image}`}
                                            alt={order.orderItems[0]?.name || 'Product Image'}
                                            className={styles.notificationImage}
                                        />
                                        <div className="flex-grow-1">
                                            <p className="mb-1 small">New Order From <strong>{order.customerDetails.name}</strong></p>
                                            <small className="text-muted">Total: Rp{new Intl.NumberFormat('id-ID').format(order.totalPrice)}</small>
                                        </div>
                                    </Dropdown.Item>
                                ))
                            )}
                        </Dropdown.Menu>
                    </Dropdown>


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