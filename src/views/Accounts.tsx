import AccountCard from "components/Accounts/AccountCard";
import { useAccounts } from "providers/AccountsProvider";
import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BRLformatter, normalizePrice } from "tools";

export default function AccountsView() {
  const { getAll, accounts } = useAccounts();

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <h1>Contas</h1>
      <div>
        <Row>
          {accounts.map((account) => (
            <Col key={account.id} lg="3" md="4" sm="6" xs="12">
              <AccountCard account={account} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
