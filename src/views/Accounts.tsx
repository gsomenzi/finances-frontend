import AccountCard from "components/Accounts/AccountCard";
import AddAccountModal from "components/Accounts/AddAccountModal";
import { useAccounts } from "providers/AccountsProvider";
import React, { useEffect, useState } from "react";
import { Col, Row, Button, Spinner } from "react-bootstrap";

export default function AccountsView() {
  const { getAll, accounts, loading } = useAccounts();
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center">
          <h1>Contas</h1>
          {loading ? (
            <Spinner
              as="span"
              role="status"
              aria-hidden="true"
              className="ms-2"
            />
          ) : null}
        </div>
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
