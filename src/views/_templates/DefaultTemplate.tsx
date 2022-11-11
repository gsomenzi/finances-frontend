import React, { ReactNode } from "react";
import Sidebar from "components/Sidebar";

type Props = {
  children: ReactNode;
};

export default function DefaultTemplate({ children }: Props) {
  return (
    <div id="default-template">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
