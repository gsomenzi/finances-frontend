import React, { createContext, useState } from "react";
import { Account } from "types/Account";
import { useApi } from "./ApiProvider";

const DEFAULT_VALUE: {
  loading: boolean;
  accounts: Account[];
  getAll(): Promise<void>;
  create(newAccountData: Partial<Account>): void;
  remove(id: number): void;
} = {
  loading: false,
  accounts: [],
  getAll: async () => {},
  create: () => {},
  remove: () => {},
};

export const AccountsContext = createContext(DEFAULT_VALUE);

export const useAccounts = () => {
  const { loading, accounts, getAll, create, remove } =
    React.useContext(AccountsContext);
  return {
    loading,
    accounts,
    getAll,
    create,
    remove,
  };
};

export function AccountsProvider(props: { children: any }) {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const { httpClient } = useApi();

  const getAll = async () => {
    try {
      setLoading(true);
      const { data } = await httpClient.get("/financial-accounts");
      setAccounts(data.data);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      throw e;
    }
  };

  const create = async (newAccountData: Partial<Account>) => {
    try {
      setLoading(true);
      const { data } = await httpClient.post(
        "/financial-accounts",
        newAccountData
      );
      setAccounts([...accounts, data]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const remove = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await httpClient.delete(`/financial-accounts/${id}`);
      setAccounts([...accounts].filter((a) => a.id !== id));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  return (
    <AccountsContext.Provider
      value={{
        loading,
        accounts,
        getAll,
        create,
        remove,
      }}
    >
      {props.children}
    </AccountsContext.Provider>
  );
}
