import React from "react";
import { Outlet } from "react-router-dom";
import DefaultTemplate from "views/_templates/DefaultTemplate";

export default function RootStack() {
  return (
    <DefaultTemplate>
      <Outlet />
    </DefaultTemplate>
  );
}
