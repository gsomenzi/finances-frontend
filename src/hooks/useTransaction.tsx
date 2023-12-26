import ApiClient from '@/lib/ApiClient';
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
    const apiClient = new ApiClient();

    function getTransactions(queryParams: GetTransactionQueryParams): Promise<ListResponseData<Transaction>> {
        const { page, limit, search, startDate, endDate } = queryParams;
        return apiClient.get('/transactions', {
            page: page ?? 1,
            limit: limit ?? 20,
            search: search ?? '',
            startDate,
            endDate,
        });
    }

    function removeTransaction(id: number | string) {
        return apiClient._delete(`/transactions/${id}`);
    }

    return {
        getTransactions,
        removeTransaction,
    };
}
