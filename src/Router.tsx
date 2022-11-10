import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";
import HomeView from "./views/Home";
import LoginView from "./views/Login";
import RegisterView from "./views/Register";
import AuthTemplate from "./views/_templates/AuthTemplate";

const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "/cadastro",
    element: <RegisterView />,
  },
]);

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
]);

export default function Router() {
  const { accessToken, loadAccessToken } = useAuth();

  useEffect(() => {
    loadAccessToken();
  });

  return accessToken ? (
    <RouterProvider router={rootRouter} />
  ) : (
    <AuthTemplate>
      <RouterProvider router={authRouter} />
    </AuthTemplate>
  );
}
