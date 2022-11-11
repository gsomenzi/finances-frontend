import React from "react";
import { Card } from "react-bootstrap";
import { BRLformatter, normalizePrice } from "tools";
import { Account } from "types/Account";

type Props = {
  account: Account;
};

export default function AccountCard(props: Props) {
  const { account } = props;
  return (
    <Card>
      <Card.Header className="d-flex align-items-center">
        <h4 className="px-0 py-0 mx-0 my-0">
          {account.type === "checking" ? (
            <i className="bi bi-cash-coin me-2"></i>
          ) : null}
          {account.type === "investiment" ? (
            <i className="bi bi-currency-bitcoin me-2"></i>
          ) : null}
          {account.type === "other" ? (
            <i className="bi bi-wallet me-2"></i>
          ) : null}
        </h4>
        <Card.Title className="mb-0">{account.description}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Saldo atual: {BRLformatter(normalizePrice(account.current_balance))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
