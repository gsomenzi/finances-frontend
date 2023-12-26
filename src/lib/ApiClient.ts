import axios from 'axios';

export type RequestQueryParams = { [key: string]: string | number | boolean };

export default class ApiClient {
    public apiClient = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    constructor() {
        this.apiClient.interceptors.request.use((config) => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });
    }

    public async get<T>(url: string, queryParams?: RequestQueryParams): Promise<T> {
        const res = await this.apiClient.get<T>(url, { params: queryParams });
        return res.data;
    }

    public async post<T>(url: string, data: any): Promise<T> {
        try {
            const res = await this.apiClient.post<T>(url, data);
            return res.data;
        } catch (e: any) {
            return Promise.reject(this.parseError(e));
        }
    }

    public async put<T>(url: string, data: any): Promise<T> {
        const res = await this.apiClient.put<T>(url, data);
        return res.data;
    }

    public async _delete<T>(url: string): Promise<T> {
        const res = await this.apiClient.delete<T>(url);
        return res.data;
    }

    protected parseError(e: any) {
        if (e?.response?.data) {
            return e.response.data;
        }
        return e;
    }
}
