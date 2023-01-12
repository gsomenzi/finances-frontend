import { useAuth } from 'providers/AuthProvider';
import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import DashboardView from 'views/Dashboard';
import LoginView from 'views/auth/Login';
import RegisterView from 'views/auth/Register';
import AuthTemplate from 'views/_templates/AuthTemplate';
import DefaultTemplate from 'views/_templates/DefaultTemplate';

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
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);

const rootRouter = createBrowserRouter([
    {
        path: '/',
        element: <DefaultTemplate />,
        children: [
            {
                path: '/',
                element: <DashboardView />,
            },
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);

export default function Router() {
    const { loaded, loggedIn } = useAuth();
    return loaded ? <RouterProvider router={loggedIn ? rootRouter : authRouter} /> : null;
}
