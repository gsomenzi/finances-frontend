import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";
import HomeView from "views/Home";
import LoginView from "views/Login";
import RegisterView from "views/Register";
import AccountsView from "views/Accounts";
import RootStack from "routes/RootStack";
import AuthStack from "routes/AuthStack";
import TransactionsView from "views/Transactions";

const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthStack />,
    children: [
      {
        path: "/",
        element: <LoginView />,
      },
      {
        path: "/cadastro",
        element: <RegisterView />,
      },
    ],
  },
]);

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootStack />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "/contas",
        element: <AccountsView />,
      },
      {
        path: "/transacoes",
        element: <TransactionsView />,
      },
    ],
  },
]);

export default function Router() {
  const { accessToken, loadAccessToken } = useAuth();

  useEffect(() => {
    loadAccessToken();
  });

  return <RouterProvider router={accessToken ? rootRouter : authRouter} />;
}
