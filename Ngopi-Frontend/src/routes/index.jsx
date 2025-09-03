import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import HomePage from "../Pages/HomePage.jsx";
import LoginPage from "../Pages/LoginPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },

        ],
    },
    {
        path: '/login',
        element: <LoginPage />
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />
};

export default AppRouter;