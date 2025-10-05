import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import HomePage from "../Pages/HomePage.jsx";
import LoginPage from "../Pages/LoginPage.jsx";
import RegisterPage from "../Pages/RegisterPage.jsx";
import CartPage from "../Pages/CartPage.jsx";
import CheckOutPage from "../Pages/CheckOutPage.jsx";
import OrdersPage from "../Pages/OrdersPage.jsx";
import HistoryPage from "../Pages/HistoryPage.jsx";
import AdminDashboard from "../Pages/Admin/AdminDashboard.jsx";
import AdminRoute from "../Pages/Admin/AdminRoute.jsx";
import AdminLayout from "../components/Admin/AdminLayout.jsx";
import ManageStock from "../Pages/Admin/ManageStock.jsx";
import ManualOrder from "../Pages/Admin/ManualOrder.jsx";
import CheckOutAdmin from "../Pages/Admin/CheckOutAdmin.jsx";
import ActiveOrder from "../Pages/Admin/ActiveOrder.jsx";
import FutureOrder from "../Pages/Admin/FutureOrder.jsx";
import HistoryOrder from "../Pages/Admin/HistoryOrder.jsx";



const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'cart',
                element: <CartPage />
            },
            {
                path: 'checkout',
                element: <CheckOutPage />
            },
            {
                path: 'orders',
                element: <OrdersPage />
            },
            {
                path: 'history',
                element: <HistoryPage />
            }

        ],
    },
    {
        path: '/admin',
        element: <AdminRoute />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    {path: 'dashboard', element: <AdminDashboard />},
                    {path: 'manage-stock', element: <ManageStock />},
                    {path: 'manual-order', element: <ManualOrder />},
                    {path: 'admin-checkout', element: <CheckOutAdmin />},
                    {path: 'active-orders', element: <ActiveOrder />},
                    {path: 'future-orders', element: <FutureOrder />},
                    {path: 'history', element: <HistoryOrder />},
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />
};

export default AppRouter;