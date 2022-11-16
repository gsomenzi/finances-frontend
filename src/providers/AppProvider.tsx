import React, { createContext, ReactNode } from "react";
import { AccountsProvider } from "./AccountsProvider";
import { ApiProvider } from "./ApiProvider";
import { AuthProvider } from "./AuthProvider";
import { CategoryProvider } from "./CategoryProvider";

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
          <CategoryProvider>
            <AccountsProvider>{children}</AccountsProvider>
          </CategoryProvider>
        </AuthProvider>
      </ApiProvider>
    </AppContext.Provider>
  );
}
