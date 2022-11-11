import AccountCard from "components/Accounts/AccountCard";
import AddAccountModal from "components/Accounts/AddAccountModal";
import { useAccounts } from "providers/AccountsProvider";
import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";

export default function AccountsView() {
  const { getAll, accounts } = useAccounts();
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h1>Contas</h1>
        <div>
          <Button onClick={() => setShowAddModal(true)}>Adicionar</Button>
        </div>
      </div>
      <div>
        <Row>
          {accounts.map((account) => (
            <Col key={account.id} lg="3" md="4" sm="6" xs="12">
              <AccountCard account={account} />
            </Col>
          ))}
        </Row>
      </div>
      <AddAccountModal show={showAddModal} setShow={setShowAddModal} />
    </div>
  );
}
