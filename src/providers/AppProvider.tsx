import React, { createContext, ReactNode } from "react";
import { AccountsProvider } from "./AccountsProvider";
import { ApiProvider } from "./ApiProvider";
import { AuthProvider } from "./AuthProvider";

const DEFAULT_VALUE = null;

export const AppContext = createContext(DEFAULT_VALUE);

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  return (
    <AppContext.Provider value={null}>
      <ApiProvider>
        <AuthProvider>
          <AccountsProvider>{children}</AccountsProvider>
        </AuthProvider>
      </ApiProvider>
    </AppContext.Provider>
  );
}
