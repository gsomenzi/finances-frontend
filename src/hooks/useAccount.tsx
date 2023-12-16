import React from 'react';
import { useApi } from '@/providers/ApiProvider';
import { Account } from '@/types/Account';
import { ListResponseData } from '@/types/ListResponseData';
import { QueryFunctionContext, QueryKey } from 'react-query';

type GetAccountQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
};

export function useAccount() {
    const { get, delete: _delete } = useApi();

    function getAccounts(queryParams: GetAccountQueryParams): Promise<ListResponseData<Account>> {
        const { page, limit, search } = queryParams;
        return get('/accounts', {
            page: page ?? 1,
            limit: limit ?? 20,
            search: search ?? '',
        });
    }

    function getAccountsBalances(accountIds: number[]): Promise<any> {
        return get('/accounts/balances', {
            accountIds: accountIds.join(',') || '',
        });
    }

    function removeAccount(id: number | string) {
        return _delete(`/accounts/${id}`);
    }

    return {
        getAccounts,
        getAccountsBalances,
        removeAccount,
    };
}
