import classNames from "classnames";
import AddAccountModal from "components/Accounts/AddAccountModal";
import { useAccounts } from "providers/AccountsProvider";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { BRLformatter, normalizePrice } from "tools";

export default function AccountsView() {
  const { getAll, accounts, loading, remove, markAsFavorite } = useAccounts();
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  function handleFavorite(id: number) {
    markAsFavorite(id);
  }

  function handleRemove(id: number) {
    if (confirm("Você realmente deseja remover esta conta?")) {
      remove(id);
    }
  }

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
        <Table striped bordered responsive>
          <thead>
            <tr>
              <td className="compact">#</td>
              <td>Descrição</td>
              <td>Saldo atual</td>
              <td>Saldo previsto</td>
              <td className="text-end compact">Ações</td>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, i) => (
              <tr key={account.id}>
                <td className="compact">{i + 1}</td>
                <td>
                  {account.description}{" "}
                  {account.default ? (
                    <i className="bi bi-star-fill text-warning"></i>
                  ) : null}
                </td>

                <td>
                  <span
                    className={classNames({
                      "text-success": account.current_balance > 0,
                      "text-danger": account.current_balance < 0,
                    })}
                  >
                    {BRLformatter(
                      normalizePrice(account?.current_balance || 0)
                    )}
                  </span>
                </td>
                <td>
                  <span
                    className={classNames({
                      "text-success": account.expected_balance > 0,
                      "text-danger": account.expected_balance < 0,
                    })}
                  >
                    {BRLformatter(
                      normalizePrice(account?.expected_balance || 0)
                    )}
                  </span>
                </td>
                <td className="text-end compact">
                  <Button
                    disabled={account.default}
                    onClick={() => handleFavorite(account.id)}
                  >
                    <i className="bi bi-star-fill"></i>
                  </Button>
                  <Button onClick={() => handleFavorite(account.id)}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(account.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                <h5 className="mb-0">Total</h5>
              </td>
              <td>
                {BRLformatter(
                  accounts.reduce(
                    (previous, current) =>
                      (previous += normalizePrice(current.current_balance)),
                    0
                  )
                )}
              </td>
              <td colSpan={2}>
                {BRLformatter(
                  accounts.reduce(
                    (previous, current) =>
                      (previous += normalizePrice(current.expected_balance)),
                    0
                  )
                )}
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
      <AddAccountModal show={showAddModal} setShow={setShowAddModal} />
    </div>
  );
}
