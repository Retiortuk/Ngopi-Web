import React from "react";
import styles from './Navbar.module.css';
import { Link } from "react-router-dom";
import { userCartStore } from "../stores/userCartStore";


function Navbar({ activeSection }) {
    const cart =  userCartStore((state) => state.cart);
    const totalItems =  cart.reduce((total, item) => total + item.quantity, 0);

    return (
        //  <!-- NABAR -->
        <nav id="navbar-example" className="navbar-expand-md sticky-top">
            <div className="container-navbar bg-light shadow p-3 pt-1 position-relative">
                {/* <!-- ROW FOR BRAND, SEARCH, USER REQ --> */}
                <div className="row nav-1 align-items-center">
                    {/* <!-- Brand --> */}
                    <div className="col-md-4 brand-container d-flex justify-content-center justify-content-md-start align-items-center text-center">
                        <h1 className="ms-0 ms-md-5" style={{fontFamily: 'Plus Jakarta Sans, sans-serif'}}>Ngopi.</h1>
                    </div>
                    
                    
                    {/* <!-- Search Bar --> */}
                    <div className="col-md-4 search-container">
                        <form className="position-relative" role="search">
                            <input type="search" className="form-control me-2" placeholder="Ngopi apa?" aria-label="Search" />
                            <button className="btn position-absolute end-0 top-50 translate-middle-y me-2 p-0 border-0 bg-transparent" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a5.5 5.5 0 1 1 .707-.707l3.646 3.646a1 1 0 0 1-1.414 1.414l-3.646-3.646zM12.5 6a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0z"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                    
                    {/* <!-- User Account and Cart --> */}
                    <div className="col-6 col-md-4 d-flex userReq-container d-flex justify-content-end align-items-center gap-3">
                        {/* <!-- Account User and Cart/Coffee Icon only visible on lg display --> */}
                        <div className="d-none d-md-flex gap-3 me-0 me-md-5">
                            {/* <!-- User --> */}
                            <Link to="/login">
                                <svg width="24px" height="24px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#000000"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#000000"></path> </g></svg>
                            </Link>
                            
                            {/* <!-- Cart/Coffee Icon --> */}
                            <Link to="/cart">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M8.41799 3.25089C8.69867 2.65917 9.30155 2.25 10 2.25H14C14.6984 2.25 15.3013 2.65917 15.582 3.25089C16.2655 3.25586 16.7983 3.28724 17.2738 3.47309C17.842 3.69516 18.3362 4.07266 18.6999 4.56242C19.0668 5.0565 19.2391 5.68979 19.4762 6.56144L20.2181 9.28272L20.4985 10.124C20.5065 10.1339 20.5144 10.1438 20.5222 10.1539C21.4231 11.3076 20.9941 13.0235 20.1362 16.4553C19.5905 18.638 19.3176 19.7293 18.5039 20.3647C17.6901 21.0001 16.5652 21.0001 14.3153 21.0001H9.68462C7.43476 21.0001 6.30983 21.0001 5.49605 20.3647C4.68227 19.7293 4.40943 18.638 3.86376 16.4553C3.00581 13.0235 2.57684 11.3076 3.47767 10.1539C3.48555 10.1438 3.4935 10.1338 3.50152 10.1239L3.7819 9.28271L4.52384 6.56145C4.76092 5.6898 4.93316 5.0565 5.30009 4.56242C5.66381 4.07266 6.15802 3.69516 6.72621 3.4731C7.20175 3.28724 7.73447 3.25586 8.41799 3.25089ZM8.41951 4.75231C7.75763 4.759 7.49204 4.78427 7.27224 4.87018C6.96629 4.98976 6.70018 5.19303 6.50433 5.45674C6.32822 5.69388 6.22488 6.0252 5.93398 7.09206L5.36442 9.18091C6.38451 9.00012 7.77753 9.00012 9.68462 9.00012H14.3153C16.2224 9.00012 17.6155 9.00012 18.6356 9.18092L18.066 7.09206C17.7751 6.0252 17.6718 5.69388 17.4957 5.45674C17.2998 5.19303 17.0337 4.98976 16.7278 4.87018C16.508 4.78427 16.2424 4.759 15.5805 4.75231C15.2992 5.3423 14.6972 5.75 14 5.75H10C9.30281 5.75 8.70084 5.3423 8.41951 4.75231Z" fill="#000000"></path> </g></svg>

                                {totalItems > 0 && (
                                    <span className="position-absolute top-1 start-90 translate-middle badge rounded-pill bg-danger">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <!-- ROW FOR BRAND, SEARCH, USER REQ END --> */}

                {/* <!-- FOR ICONS USER IN THE LEFT TOP(Mobile) --> */}
                <div className="d-md-none position-absolute top-0 start-0 py-2 px-3">   
                    <Link to="/login">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#000000"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#000000"></path> </g></svg>
                    </Link>
                    
                </div>                
                {/* <!-- FOR ICONS CART IN THE RIGHT TOP(Mobile) --> */}
                <div className="d-md-none position-absolute top-0 end-0 py-2 px-3"> 
                        <Link to="/cart">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M8.41799 3.25089C8.69867 2.65917 9.30155 2.25 10 2.25H14C14.6984 2.25 15.3013 2.65917 15.582 3.25089C16.2655 3.25586 16.7983 3.28724 17.2738 3.47309C17.842 3.69516 18.3362 4.07266 18.6999 4.56242C19.0668 5.0565 19.2391 5.68979 19.4762 6.56144L20.2181 9.28272L20.4985 10.124C20.5065 10.1339 20.5144 10.1438 20.5222 10.1539C21.4231 11.3076 20.9941 13.0235 20.1362 16.4553C19.5905 18.638 19.3176 19.7293 18.5039 20.3647C17.6901 21.0001 16.5652 21.0001 14.3153 21.0001H9.68462C7.43476 21.0001 6.30983 21.0001 5.49605 20.3647C4.68227 19.7293 4.40943 18.638 3.86376 16.4553C3.00581 13.0235 2.57684 11.3076 3.47767 10.1539C3.48555 10.1438 3.4935 10.1338 3.50152 10.1239L3.7819 9.28271L4.52384 6.56145C4.76092 5.6898 4.93316 5.0565 5.30009 4.56242C5.66381 4.07266 6.15802 3.69516 6.72621 3.4731C7.20175 3.28724 7.73447 3.25586 8.41799 3.25089ZM8.41951 4.75231C7.75763 4.759 7.49204 4.78427 7.27224 4.87018C6.96629 4.98976 6.70018 5.19303 6.50433 5.45674C6.32822 5.69388 6.22488 6.0252 5.93398 7.09206L5.36442 9.18091C6.38451 9.00012 7.77753 9.00012 9.68462 9.00012H14.3153C16.2224 9.00012 17.6155 9.00012 18.6356 9.18092L18.066 7.09206C17.7751 6.0252 17.6718 5.69388 17.4957 5.45674C17.2998 5.19303 17.0337 4.98976 16.7278 4.87018C16.508 4.78427 16.2424 4.759 15.5805 4.75231C15.2992 5.3423 14.6972 5.75 14 5.75H10C9.30281 5.75 8.70084 5.3423 8.41951 4.75231Z" fill="#000000"></path> </g></svg>
                            {totalItems > 0 && (
                                <span className="position-absolute top-1 start-90 translate-middle badge rounded-pill bg-danger">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                </div>  
                {/* <!-- FOR ICONS USER + CART(Mobile) END --> */}

                {/* <!-- ROW FOR MENUS --> */}
                <div className="row  nav-2 align-items-center text-center">
                    <div className="col d-flex align-items-center justify-content-center">
                        <ul className="nav gap-1 gap-md-4 pt-3 justify-content-center flex-wrap">
                            <li className="nav-item">
                                <a className={`${styles.navLink} nav-menu-item ${activeSection === 'home-sect' ? styles.active : ''}`} href="#home-sect">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className={`${styles.navLink} nav-menu-item ${activeSection === 'featured-sect' ? styles.active : ''}`} href="#featured-sect">Featured</a>
                            </li>
                            <li className="nav-item">
                                <a className={`${styles.navLink} nav-menu-item ${activeSection === 'menu-sect' ? styles.active : ''}`} href="#menu-sect">Menu</a>
                            </li>
                            <li className="nav-item d-none d-sm-block">
                                <a className={`${styles.navLink} nav-menu-item ${activeSection === 'about-sect' ? styles.active : ''}`} href="#about-sect">About Ngopi.</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;