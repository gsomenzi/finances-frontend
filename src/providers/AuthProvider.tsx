import React, { createContext, useState } from "react";
import { useApi } from "./ApiProvider";

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";

const DEFAULT_VALUE: {
  loading: boolean;
  accessToken: string | null;
  loadAccessToken(): void;
  authenticate(email: string, password: string): void;
  register(name: string, email: string, password: string): void;
} = {
  loading: false,
  accessToken: null,
  loadAccessToken: () => {},
  authenticate: () => {},
  register: () => {}
};

export const AuthContext = createContext(DEFAULT_VALUE);

export const useAuth = () => {
  const { accessToken, loading, loadAccessToken, authenticate, register } =
    React.useContext(AuthContext);
  return { accessToken, loading, loadAccessToken, authenticate, register };
};

export function AuthProvider(props: { children: any }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { httpClient } = useApi();

  const loadAccessToken = () => {
    const localAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    setAccessToken(localAccessToken);
  };

  const authenticate = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await httpClient.post("/auth", {
        email,
        password,
        device_name: "app",
      });
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.access_token);
      setAccessToken(data.access_token);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await httpClient.post("/register", {
        name,
        email,
        password,
        device_name: "app",
      });
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.auth_data.access_token);
      setAccessToken(data.auth_data.access_token);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        accessToken,
        authenticate,
        register,
        loadAccessToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
