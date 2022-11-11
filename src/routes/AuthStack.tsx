import React from "react";
import { Outlet } from "react-router-dom";
import AuthTemplate from "views/_templates/AuthTemplate";

export default function AuthStack() {
  return (
    <AuthTemplate>
      <Outlet />
    </AuthTemplate>
  );
}
