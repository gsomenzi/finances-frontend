import React, { createContext, useState } from "react";
import { Account } from "types/Account";
import { useApi } from "./ApiProvider";

const DEFAULT_VALUE: {
  loading: boolean;
  accounts: Account[];
  getAll(): Promise<void>;
  create(newAccountData: Partial<Account>): void;
  update(id: number, accountData: Partial<Account>): void;
  remove(id: number): void;
  markAsFavorite(id: number): void;
} = {
  loading: false,
  accounts: [],
  getAll: async () => {},
  create: () => {},
  update: () => {},
  remove: () => {},
  markAsFavorite: () => {},
};

export const AccountsContext = createContext(DEFAULT_VALUE);

export const useAccounts = () => {
  const { loading, accounts, getAll, create, update, remove, markAsFavorite } =
    React.useContext(AccountsContext);
  return {
    loading,
    accounts,
    getAll,
    create,
    update,
    remove,
    markAsFavorite,
  };
};

export function AccountsProvider(props: { children: any }) {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
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

  const update = async (id: number, accountData: Partial<Account>) => {
    try {
      setLoading(true);
      const { data } = await httpClient.put(
        `/financial-accounts/${id}`,
        accountData
      );
      const INDEX = accounts.findIndex((a) => a.id === id);
      if (INDEX > -1) {
        const tmpAccounts = [...accounts];
        tmpAccounts.splice(INDEX, 1, data);
        setAccounts(tmpAccounts);
      }
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

  const markAsFavorite = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await httpClient.put(`/financial-accounts/${id}`, {
        default: true,
      });
      const tmpAccounts = [...accounts].map((a) => ({
        ...a,
        default: a.id === id,
      }));
      setAccounts(tmpAccounts);
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
        update,
        remove,
        markAsFavorite,
      }}
    >
      {props.children}
    </AccountsContext.Provider>
  );
}
