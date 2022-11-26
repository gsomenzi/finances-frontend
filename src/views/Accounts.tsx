import classNames from "classnames";
import AddAccountModal from "components/Accounts/AddAccountModal";
import { useAccounts } from "providers/AccountsProvider";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import {
  CurrencyFormatter,
  getCurrencyData,
  getTranslatedAccountType,
  normalizePrice,
} from "tools";
import { Account } from "types/Account";

export default function AccountsView() {
  const { getAll, accounts, loading, remove, markAsFavorite } = useAccounts();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  useEffect(() => {
    getAll();
  }, []);

  function handleFavorite(id: number) {
    markAsFavorite(id);
  }

  function handleAdd() {
    setSelectedAccount(null);
    setShowAddModal(true);
  }

  function handleEdit(account: Account) {
    setSelectedAccount(account);
    setShowAddModal(true);
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
          <Button onClick={() => handleAdd()}>Adicionar</Button>
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
                  <h5 className="mb-0">
                    {account.description}{" "}
                    {account.default ? (
                      <i className="bi bi-star-fill text-warning"></i>
                    ) : null}
                  </h5>
                  <span>{getTranslatedAccountType(account.type)}</span>
                </td>

                <td>
                  <div
                    className={classNames({
                      "text-success": account.current_balance > 0,
                      "text-danger": account.current_balance < 0,
                    })}
                  >
                    {CurrencyFormatter(
                      normalizePrice(account?.current_balance || 0),
                      getCurrencyData(account?.currency)?.symbol || ""
                    )}
                  </div>
                  {account.currency !== 'BRL' ? (
                    <span className="money-subtitle">
                    {CurrencyFormatter(
                        normalizePrice(account?.converted_balance || 0), 'R$'
                      )}
                    </span>
                  ) : null}
                </td>
                <td>
                  <div
                    className={classNames({
                      "text-success": account.expected_balance > 0,
                      "text-danger": account.expected_balance < 0,
                    })}
                  >
                    {CurrencyFormatter(
                      normalizePrice(account?.expected_balance || 0),
                      getCurrencyData(account?.currency)?.symbol || ""
                    )}
                  </div>
                  {account.currency !== 'BRL' ? (
                    <span className="money-subtitle">
                    {CurrencyFormatter(
                        normalizePrice(account?.converted_expected_balance || 0), 'R$'
                      )}
                    </span>
                  ) : null}
                </td>
                <td className="text-end compact">
                  <Button
                    disabled={account.default}
                    onClick={() => handleFavorite(account.id)}
                  >
                    <i className="bi bi-star-fill"></i>
                  </Button>
                  <Button onClick={() => handleEdit(account)}>
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
                {CurrencyFormatter(
                  accounts.reduce(
                    (previous, current) =>
                      (previous += normalizePrice(current.converted_balance)),
                    0
                  ), 'R$'
                )}
              </td>
              <td colSpan={2}>
                {CurrencyFormatter(
                  accounts.reduce(
                    (previous, current) =>
                      (previous += normalizePrice(current.converted_expected_balance)),
                    0
                  ), 'R$'
                )}
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
      <AddAccountModal
        show={showAddModal}
        setShow={setShowAddModal}
        account={selectedAccount}
      />
    </div>
  );
}
