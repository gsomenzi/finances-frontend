import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { normalizeError } from 'tools';
import HttpClient from 'tools/HttpClient';

type NewUserdata = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type AuthContextProps = {
    loaded: boolean;
    loggedIn: boolean;
    getting: boolean;
    authenticate(email: string, password: string): void;
    register(newUserData: NewUserdata): void;
    signOut(): void;
    authenticating: boolean;
};

const props: AuthContextProps = {
    loaded: false,
    loggedIn: false,
    getting: false,
    authenticate: () => {},
    register: () => {},
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
    const [getting, setGetting] = useState<boolean>(true);
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
            const { data } = await HttpClient.post('/auth', { email, password, device_name: 'frontend' });
            localStorage.setItem('auth_data', JSON.stringify(data));
            setLoggedIn(true);
            setAuthenticating(false);
            return;
        } catch (e: any) {
            setAuthenticating(false);
            return Promise.reject(normalizeError(e));
        }
    };

    const register = async (newUserData: NewUserdata): Promise<any> => {
        try {
            const { email, password, name } = newUserData;
            setAuthenticating(true);
            // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // if (auth.currentUser) {
            //     await updateProfile(auth.currentUser, {
            //         displayName: name,
            //     });
            // }
            // const user = userCredential.user;
            setAuthenticating(false);
            return;
        } catch (e: any) {
            setAuthenticating(false);
            return Promise.reject(normalizeError(e));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                getting,
                loaded,
                authenticate,
                authenticating,
                register,
                signOut,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
