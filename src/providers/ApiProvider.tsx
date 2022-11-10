import React, {createContext, ReactNode, useState} from 'react'
import HttpClient from '../api/HttpClient';

const DEFAULT_VALUE: {
    httpClient: HttpClient
} = {
    httpClient: new HttpClient()
};

export const ApiContext = createContext(DEFAULT_VALUE);

type Props = {
    children: ReactNode;
}

export const useApi = () => {
    const { httpClient } = React.useContext(ApiContext);
    return { httpClient };
};

export function ApiProvider({ children }: Props) {
    const [httpClient] = useState(new HttpClient());
    return (
        <ApiContext.Provider value={{
            httpClient
        }}>
            {children}
        </ApiContext.Provider>
    );
}