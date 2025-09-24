import React, { use } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNavigate, NavLink } from "react-router-dom";
import styles from './AdminSidebar.module.css';
import toast from "react-hot-toast";

const navLinks = [
    { path: '/admin/dashboard', icon: 'bi-house-door-fill', label: 'Dashboard' },
    { path: '/admin/manage-stock', icon: 'bi-box-seam-fill', label: 'Manage Stok' },
    { path: '/admin/manual-order', icon: 'bi-plus-circle-fill', label: 'Manual Order' },
    { path: '/admin/active-orders', icon: 'bi-clock-history', label: 'Active Orders' },
    { path: '/admin/future-orders', icon: 'bi-calendar-check-fill', label: 'Future Orders' },
];

function AdminSidebar() {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        toast.success('Sucessfully Logout');
        navigate('/login')
    };

    return(
        <aside className={`bg-white shadow-sm d-flex flex-column ${styles.sidebar}`}>
            <div className="py-4">
                <nav className="nav flex-column">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path} 
                            className={({ isActive })=> `nav-link d-flex align-items-center gap-3 ${styles.navLink} ${isActive ? styles.active : ''}`}
                        >
                            <i className={`bi ${link.icon} fs-5`}></i>
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="mt-auto p-3">
                <button onClick={handleLogOut} className={`btn w-100 ${styles.signOutButton}`}>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}

export default AdminSidebar;
