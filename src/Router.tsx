import { useAuth } from 'providers/AuthProvider';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthTemplate from 'views/_templates/AuthTemplate';
import LoginView from 'views/auth/Login';
import RegisterView from 'views/auth/Register';
import DashboardView from 'views/Dashboard';

const authRouter = createBrowserRouter([
    {
        path: '/',
        element: <AuthTemplate />,
        children: [
            {
                path: '/',
                element: <LoginView />,
            },
            {
                path: '/cadastro',
                element: <RegisterView />,
            },
        ],
    },
]);

const rootRouter = createBrowserRouter([
    {
        path: '/',
        element: <DashboardView />,
    },
]);

export default function Router() {
    const { loaded, loggedIn } = useAuth();
    return loaded ? <RouterProvider router={loggedIn ? rootRouter : authRouter} /> : null;
}
