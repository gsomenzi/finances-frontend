import React from 'react';
import { useApi } from '@/providers/ApiProvider';
import { ListResponseData } from '@/types/ListResponseData';
import { Transaction } from '@/types/Transaction';

type GetTransactionQueryParams = {
    startDate: string;
    endDate: string;
    page?: number;
    limit?: number;
    search?: string;
};

export function useTransaction() {
    const { get, delete: _delete } = useApi();

    function getTransactions(queryParams: GetTransactionQueryParams): Promise<ListResponseData<Transaction>> {
        const { page, limit, search, startDate, endDate } = queryParams;
        return get('/transactions', {
            page: page ?? 1,
            limit: limit ?? 20,
            search: search ?? '',
            startDate,
            endDate,
        });
    }

    function removeTransaction(id: number | string) {
        return _delete(`/transactions/${id}`);
    }

    return {
        getTransactions,
        removeTransaction,
    };
}
