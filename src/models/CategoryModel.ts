import { Category } from '@/types/Category';
import _ApiModel from './_ApiModel';
import { RequestQueryParams } from '@/lib/ApiClient';
import { ListResponseData } from '@/types/ListResponseData';

export default class CategoryModel extends _ApiModel<Category, Partial<Category>> {
    protected url = '/categories';

    public findManyByDestination(
        destination: 'income' | 'expense',
        queryParams: RequestQueryParams,
    ): Promise<ListResponseData<Category>> {
        return this.apiClient.get(`${this.url}/${destination}`, queryParams);
    }
}
