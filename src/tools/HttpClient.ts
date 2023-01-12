import axios, { AxiosRequestConfig } from 'axios';
import { addQueryString } from 'tools';
import { AuthData } from 'types/AuthData';

const DEFAULT_API_BASEURL = 'http://192.168.0.150/api';

type QueryStrings = {
    [key: string]: string | number;
};

export default class HttpClient {
    protected static client = axios.create({
        baseURL: DEFAULT_API_BASEURL,
        timeout: 30000,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    public static async get(uri: string, queryStrings?: QueryStrings) {
        this.configureInterceptors();
        try {
            let url = `${uri}`;
            if (queryStrings) {
                Object.entries(queryStrings).forEach(([key, value]) => {
                    url = addQueryString(url, key, value);
                });
            }
            return (await this.client.get(url)).data;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public static async post(uri: string, data: any, config?: AxiosRequestConfig) {
        this.configureInterceptors();
        try {
            return (await this.client.post(uri, data || {}, config)).data;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public static async put(uri: string, data: any, config?: AxiosRequestConfig) {
        this.configureInterceptors();
        try {
            return (await this.client.put(uri, data || {}, config)).data;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public static async delete(uri: string, config?: AxiosRequestConfig) {
        this.configureInterceptors();
        try {
            return (await this.client.delete(uri, config)).data;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    protected static configureInterceptors() {
        this.client.interceptors.request.use(
            async config => {
                if (!localStorage.getItem('auth_data')) return config;
                const authData: AuthData = JSON.parse(localStorage.getItem('auth_data') || '');
                if (authData) {
                    config.headers = {
                        Authorization: `Bearer ${authData.access_token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    };
                    return config;
                } else {
                    return config;
                }
            },
            error => {
                Promise.reject(error);
            },
        );
    }
}
