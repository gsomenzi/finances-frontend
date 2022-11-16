import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "components/Sidebar";
import { useCategory } from "providers/CategoryProvider";
import AddExpenseModal from "components/Transactions/AddExpenseModal";
import { useAccounts } from "providers/AccountsProvider";

type Props = {
  children: ReactNode;
};

export default function DefaultTemplate({ children }: Props) {
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <div id="default-template">
      <Sidebar onAddExpense={() => setShowExpenseModal(true)} />
      <main>{children}</main>
      <AddExpenseModal show={showExpenseModal} setShow={setShowExpenseModal} />
    </div>
  );
}
