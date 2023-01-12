import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { normalizeError } from 'tools';
import HttpClient from 'tools/HttpClient';

type AuthContextProps = {
    loaded: boolean;
    loggedIn: boolean;
    authenticate(email: string, password: string): void;
    persistAuthData(authData: any): void;
    signOut(): void;
    authenticating: boolean;
};

const props: AuthContextProps = {
    loaded: false,
    loggedIn: false,
    authenticate: () => {},
    persistAuthData: () => {},
    signOut: () => {},
    authenticating: false,
};

const AuthContext = createContext(props);

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export default function AuthProvider(props: { children: ReactNode }) {
    const { children } = props;
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [authenticating, setAuthenticating] = useState(false);

    useEffect(() => {
        setLoggedIn(Boolean(localStorage.getItem('auth_data')));
        setLoaded(true);
    }, []);

    const signOut = () => {
        localStorage.removeItem('auth_data');
        setLoggedIn(false);
    };

    const authenticate = async (email: string, password: string): Promise<any> => {
        try {
            setAuthenticating(true);
            const data = await HttpClient.post('/auth', { email, password, device_name: 'frontend' });
            persistAuthData(data);
            setLoggedIn(true);
            setAuthenticating(false);
            return;
        } catch (e: any) {
            setAuthenticating(false);
            return Promise.reject(normalizeError(e));
        }
    };

    const persistAuthData = (authData: any) => {
        localStorage.setItem('auth_data', JSON.stringify(authData));
        setLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                loaded,
                authenticate,
                persistAuthData,
                authenticating,
                signOut,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
