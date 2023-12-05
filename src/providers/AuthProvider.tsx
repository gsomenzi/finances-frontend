import { useApi } from '@/hooks/useApi';
import { User } from '@/types/User';
import React, { useEffect } from 'react';

export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
};

const AuthContextProps: {
    authenticated: boolean;
    authenticating: boolean;
    errorMessage: string;
    registering: boolean;
    authenticate: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (payload: RegisterPayload) => Promise<void>;
} = {
    authenticated: false,
    authenticating: false,
    errorMessage: '',
    registering: false,
    authenticate: async () => {},
    logout: () => {},
    register: async () => {},
};

const AuthContext = React.createContext(AuthContextProps);

export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider({ children }: any) {
    const [authenticated, setAuthenticated] = React.useState(false);
    const [authenticating, setAuthenticating] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [registering, setRegistering] = React.useState(false);
    const { post } = useApi();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setAuthenticated(true);
        }
    }, []);

    async function authenticate(email: string, password: string) {
        try {
            setAuthenticating(true);
            setErrorMessage('');
            const res: { access_token: string; refresh_token: string } = await post('/auth/signin', { email, password });
            localStorage.setItem('accessToken', res.access_token);
            localStorage.setItem('refreshToken', res.refresh_token);
            setAuthenticated(true);
        } catch (e: any) {
            setErrorMessage(e.message || 'Ocorreu um erro inesperado');
            console.error(e);
        } finally {
            setAuthenticating(false);
        }
    }

    async function register(payload: RegisterPayload) {
        try {
            const { email, password } = payload;
            setRegistering(true);
            setErrorMessage('');
            const user: User = await post('/register', payload);
            const res: { access_token: string; refresh_token: string } = await post('/auth/signin', { email, password });
            localStorage.setItem('accessToken', res.access_token);
            localStorage.setItem('refreshToken', res.refresh_token);
            setAuthenticated(true);
        } catch (e: any) {
            setErrorMessage(e.message || 'Ocorreu um erro inesperado');
            console.error(e);
        } finally {
            setRegistering(false);
        }
    }

    async function logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                authenticating,
                errorMessage,
                registering,
                authenticate,
                logout,
                register,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
