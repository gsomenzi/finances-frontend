import { ListResponseData } from '@/types/ListResponseData';
import { Category } from '@/types/Category';
import ApiClient from '@/lib/ApiClient';

type GetCategoryQueryParams = {
    type: 'income' | 'expense';
    page?: number;
    limit?: number;
    search?: string;
};

export function useCategory() {
    const apiClient = new ApiClient();

    function getCategories(queryParams: GetCategoryQueryParams): Promise<ListResponseData<Category>> {
        const { type, page, limit, search } = queryParams;
        return apiClient.get(`/categories/${type}`, {
            page: page ?? 1,
            limit: limit ?? 20,
            search: search ?? '',
        });
    }

    function removeCategory(id: number | string) {
        return apiClient._delete(`/categories/${id}`);
    }

    return {
        getCategories,
        removeCategory,
    };
}
