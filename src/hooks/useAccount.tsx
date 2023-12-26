import { Account } from '@/types/Account';
import { ListResponseData } from '@/types/ListResponseData';
import ApiClient from '@/lib/ApiClient';

type GetAccountQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
};

export function useAccount() {
    const apiClient = new ApiClient();

    function getAccounts(queryParams: GetAccountQueryParams): Promise<ListResponseData<Account>> {
        const { page, limit, search } = queryParams;
        return apiClient.get('/accounts', {
            page: page ?? 1,
            limit: limit ?? 20,
            search: search ?? '',
        });
    }

    function getAccountsBalances(accountIds: number[]): Promise<any> {
        return apiClient.get('/accounts/balances', {
            accountIds: accountIds.join(',') || '',
        });
    }

    function removeAccount(id: number | string) {
        return apiClient._delete(`/accounts/${id}`);
    }

    return {
        getAccounts,
        getAccountsBalances,
        removeAccount,
    };
}
