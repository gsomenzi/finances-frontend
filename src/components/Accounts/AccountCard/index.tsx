import classNames from "classnames";
import { useAccounts } from "providers/AccountsProvider";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { BRLformatter, normalizePrice } from "tools";
import { Account } from "types/Account";

type Props = {
  account: Account;
};

export default function AccountCard(props: Props) {
  const { account } = props;
  const { remove } = useAccounts();

  function handleRemove() {
    if (confirm("Você deseja remover a conta?")) {
      remove(account.id);
    }
  }

  return (
    <Card className="mb-3">
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
        <Card.Text className="d-flex align-items-center justify-content-between">
          <span>Saldo atual:</span>
          <span
            className={classNames({
              "text-success": account.current_balance > 0,
              "text-danger": account.current_balance < 0,
            })}
          >
            {BRLformatter(normalizePrice(account.current_balance))}
          </span>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button color="danger" onClick={handleRemove}>
          <i className="bi bi-trash"></i>
        </Button>
      </Card.Footer>
    </Card>
  );
}
