import ApiClient, { RequestQueryParams } from '@/lib/ApiClient';
import { ListResponseData } from '@/types/ListResponseData';

type BaseEntity = {
    id: number | string;
};

export default abstract class _ApiModel<T extends BaseEntity, C = any, U = any> {
    protected apiClient = new ApiClient();
    protected url: string = '';

    public findMany(queryParams: RequestQueryParams): Promise<ListResponseData<T>> {
        return this.apiClient.get(this.url, queryParams);
    }

    public findOne(id: number | string): Promise<T> {
        return this.apiClient.get(`${this.url}/${id}`);
    }

    public create(data: C): Promise<T> {
        return this.apiClient.post(this.url, data);
    }

    public update(id: number | string, data: U): Promise<T> {
        return this.apiClient.put(`${this.url}/${id}`, data);
    }

    public delete(id: number | string): Promise<void> {
        return this.apiClient._delete(`${this.url}/${id}`);
    }
}
