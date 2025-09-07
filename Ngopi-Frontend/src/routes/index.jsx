import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import HomePage from "../Pages/HomePage.jsx";
import LoginPage from "../Pages/LoginPage.jsx";
import RegisterPage from "../Pages/RegisterPage.jsx";
import CartPage from "../Pages/CartPage.jsx";
import CheckOutPage from "../Pages/CheckOutPage.jsx";


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
            }

        ],
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