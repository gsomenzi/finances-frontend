'use client';

import React, { createContext, useContext } from 'react';
import axios from 'axios';

export type RequestQueryParams = { [key: string]: string | number | boolean };

const apiContextProps: {
    get: (url: string, queryParams?: RequestQueryParams) => Promise<any>;
    post: (url: string, data: any) => Promise<any>;
    put: (url: string, data: any) => Promise<any>;
    delete: (url: string) => Promise<any>;
} = {
    get: async (url, queryParams) => {},
    post: async (url, data) => {},
    put: async (url, data) => {},
    delete: async (url) => {},
};

const ApiContext = createContext(apiContextProps);

export const useApi = () => useContext(ApiContext);

export function ApiProvider({ children }: { children: React.ReactNode }) {
    const apiClient = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    async function get<T>(url: string, queryParams?: RequestQueryParams): Promise<T> {
        const res = await apiClient.get<T>(url, { params: queryParams });
        return res.data;
    }

    async function post<T>(url: string, data: any): Promise<T> {
        try {
            const res = await apiClient.post<T>(url, data);
            return res.data;
        } catch (e: any) {
            return Promise.reject(parseError(e));
        }
    }

    async function put<T>(url: string, data: any): Promise<T> {
        const res = await apiClient.put<T>(url, data);
        return res.data;
    }

    async function deleteApi<T>(url: string): Promise<T> {
        const res = await apiClient.delete<T>(url);
        return res.data;
    }

    function parseError(e: any) {
        if (e?.response?.data) {
            return e.response.data;
        }
        return e;
    }

    return (
        <ApiContext.Provider
            value={{
                get,
                post,
                put,
                delete: deleteApi,
            }}>
            {children}
        </ApiContext.Provider>
    );
}
