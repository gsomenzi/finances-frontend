import React from 'react';
import { useApi } from '@/providers/ApiProvider';
import { ListResponseData } from '@/types/ListResponseData';
import { Category } from '@/types/Category';

type GetCategoryQueryParams = {
    type: 'income' | 'expense';
    page?: number;
    limit?: number;
    search?: string;
};

export function useCategory() {
    const { get, delete: _delete } = useApi();

    function getCategories(queryParams: GetCategoryQueryParams): Promise<ListResponseData<Category>> {
        const { type, page, limit, search } = queryParams;
        return get(`/categories/${type}`, {
            page: page ?? 1,
            limit: limit ?? 20,
            search: search ?? '',
        });
    }

    function removeCategory(id: number | string) {
        return _delete(`/categories/${id}`);
    }

    return {
        getCategories,
        removeCategory,
    };
}
