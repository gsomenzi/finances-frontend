import React, { createContext, useState } from "react";
import { Account } from "types/Account";
import { useApi } from "./ApiProvider";

const DEFAULT_VALUE: {
  loading: boolean;
  accounts: Account[];
  getAll(): void;
} = {
  loading: false,
  accounts: [],
  getAll: () => {},
};

export const AccountsContext = createContext(DEFAULT_VALUE);

export const useAccounts = () => {
  const { loading, accounts, getAll } = React.useContext(AccountsContext);
  return {
    loading,
    accounts,
    getAll,
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

  return (
    <AccountsContext.Provider
      value={{
        loading,
        accounts,
        getAll,
      }}
    >
      {props.children}
    </AccountsContext.Provider>
  );
}
