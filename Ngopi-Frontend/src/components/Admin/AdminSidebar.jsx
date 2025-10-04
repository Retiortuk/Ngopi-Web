import React, { use } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNavigate, NavLink } from "react-router-dom";
import styles from './AdminSidebar.module.css';
import toast from "react-hot-toast";
import Offcanvas from 'react-bootstrap/Offcanvas';

const navLinks = [
    { path: '/admin/dashboard', icon: 'bi-house-door-fill', label: 'Dashboard' },
    { path: '/admin/manage-stock', icon: 'bi-box-seam-fill', label: 'Manage Stok' },
    { path: '/admin/manual-order', icon: 'bi-plus-circle-fill', label: 'Manual Order' },
    { path: '/admin/active-orders', icon: 'bi-clock-history', label: 'Active Orders' },
    { path: '/admin/future-orders', icon: 'bi-calendar-check-fill', label: 'Future Orders' },
    { path: '/admin/history', icon: 'bi-receipt', label: 'History Orders' },
];

const SidebarContent = ({ onLinkClick }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        if (onLinkClick) onLinkClick(); 
        logout();
        toast.success('Berhasil logout');
        navigate('/login');
    };

    return (
        <>
                <div className="py-4 flex-grow-1" style={{fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
                    <nav className="nav flex-column">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path} 
                                onClick={onLinkClick} 
                                className={({ isActive })=> `d-flex text-decoration-none align-items-center gap-3 ${styles.navLink} ${isActive ? styles.active : ''}`}
                            >
                                <i className={`bi ${link.icon} fs-5`}></i>
                                <span>{link.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>
                <div className="p-3" style={{fontFamily: 'Plus Jakarta Sans, sans-serif'}} >
                    <button onClick={handleLogOut} className={`btn w-100 ${styles.signOutButton}`}>
                        Sign Out
                    </button>
                </div>
        </>
    );
};

function AdminSidebar({ show, handleClose }) {
    return (
        <>
            <aside className={`bg-white shadow-sm d-none d-lg-flex flex-column ${styles.sidebar}`}>
                <SidebarContent />
            </aside>

            <Offcanvas show={show} onHide={handleClose} className="d-lg-none">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column p-0">
                    <SidebarContent onLinkClick={handleClose} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default AdminSidebar;
