import React from 'react';
import { useApi } from '@/providers/ApiProvider';
import { Account } from '@/types/Account';
import { ListResponseData } from '@/types/ListResponseData';
import { QueryKey } from 'react-query';

type GetAccountsProps = {
    page?: number;
    limit?: number;
    search?: string;
};

export function useAccount() {
    const { get } = useApi();

    function getAccounts(key: any, { page, limit, search }: GetAccountsProps = {}): Promise<ListResponseData<Account>> {
        return get('/accounts', {
            page: page ?? 1,
            limit: limit ?? 25,
            search: search ?? '',
        });
    }

    function getAccountsBalances({ queryKey }: any): Promise<any> {
        return get('/accounts/balances', {
            accountIds: queryKey[1]?.accountIds || '',
        });
    }

    return {
        getAccounts,
        getAccountsBalances,
    };
}
