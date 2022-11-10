import React, { ReactNode } from "react";
import { Card } from "react-bootstrap";

type Props = {
  children: ReactNode;
};

export default function AuthTemplate({ children }: Props) {
  return (
    <div id="auth-template">
      <main>
        <Card id="auth-card" className="p-3 mw-100">
          {children}
        </Card>
      </main>
    </div>
  );
}
