import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

export default class HttpClient {
    client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: 'http://192.168.0.107/api',
            timeout: 30000,
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        this.configureInterceptors();
    }

    /**
     * Efetua uma requisição do tipo GET
     * @param url URL de destino da requisição
     */
     public async get(url: string, config: AxiosRequestConfig | null = null) {
        if (config) {
            return await this.client.get(url, config);
        } else {
            return await this.client.get(url);
        }
    }

    /**
     * Efetua uma requisição do tipo POST
     * @param url URL de destino da requisição
     * @param body Dados a serem enviados no corpo da requisição
     */
    public async post(url: string, body: any = {}, config: AxiosRequestConfig | null = null) {
        if (config) {
            return await this.client.post(url, body, config);
        } else {
            return await this.client.post(url, body);
        }
    }

    /**
     * Efetua uma requisição do tipo PUT
     * @param url URL de destino da requisição
     * @param body Dados a serem enviados no corpo da requisição
     */
    public async put(url: string, body = {}, config: AxiosRequestConfig | null = null) {
        if (config) {
            return await this.client.put(url, body, config);
        } else {
            return await this.client.put(url, body);
        }
    }

    /**
     * Efetua uma requisição do tipo PATCH
     * @param url URL de destino da requisição
     * @param body Dados a serem enviados no corpo da requisição
     */
    public async patch(url: string, body = {}, config: AxiosRequestConfig | null = null) {
        if (config) {
            return await this.client.patch(url, body, config);
        } else {
            return await this.client.patch(url, body);
        }
    }

    /**
     * Efetua uma requisição do tipo DELETE
     * @param url URL de destino da requisição
     * @param body Dados passados no payload da requisição
     */
    public async delete(url: string, body: any = null, config: AxiosRequestConfig | null = null) {
        if (body && config) {
            return await this.client.delete(url, { ...config, data: body });
        } else if (body && !config) {
            return await this.client.delete(url, { data: body });
        } else {
            return await this.client.delete(url);
        }
    }

    private configureInterceptors() {
        this.client.interceptors.request.use(
            async (config: AxiosRequestConfig) => {
                if (config?.headers) {
                    const accessToken: string | null = this.getStoredAccessToken();
                    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : null;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            },
        );
    }

    private getStoredAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    }
}