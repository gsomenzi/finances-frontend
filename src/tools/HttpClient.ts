import axios, { AxiosRequestConfig } from 'axios';
import { addQueryString } from 'tools';

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
            'Content-Type': 'application/json'
        }
    })

    public static async get(uri: string, queryStrings: QueryStrings) {
        try {
            let url = `${uri}`;
            if (queryStrings) {
                Object.entries(queryStrings).forEach(([key, value]) => {
                    url = addQueryString(url, key, value);
                });
            }
            return await this.client.get(url);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public static async post(uri: string, data: any, config?: AxiosRequestConfig) {
        try {
            return await this.client.post(uri, data || {}, config);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public static async put(uri: string, data: any, config?: AxiosRequestConfig) {
        try {
            return await this.client.put(uri, data || {}, config);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public static async delete(uri: string, config?: AxiosRequestConfig) {
        try {
            return await this.client.get(uri, config);
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
