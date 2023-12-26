'use client';

import React, { useState } from 'react';
import { AccountsViewProps } from './types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Account } from '@/types/Account';
import { AccountBalance } from '@/types/AccountBalance';
import { ListResponseData } from '@/types/ListResponseData';
import AccountModel from '@/models/AccountModel';

export default function AccountsViewModel(): AccountsViewProps {
    const accountModel = new AccountModel();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [search, setSearch] = useState('');

    const { data: accounts, isLoading: gettingAccounts } = useQuery<ListResponseData<Account>>(
        ['accounts', { page, limit, search }],
        () => accountModel.findMany({ page, limit, search }),
        {
            refetchOnWindowFocus: false,
        },
    );

    const accountIds: number[] = (accounts?.data || []).map((a: any) => a.id) || [];

    const { data: balanceData, isLoading: gettingBalances } = useQuery<AccountBalance[], Error>(
        ['balances', { accountIds }],
        ({ queryKey }) => {
            const { accountIds } = queryKey[1] as any;
            return accountModel.getAccountsBalances(accountIds as number[]);
        },
        {
            enabled: accountIds.length > 0,
            refetchOnWindowFocus: false,
        },
    );

    const { mutate: remove, isLoading: isRemoving } = useMutation((id: number) => accountModel.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('accounts');
        },
    });

    const isLoading = gettingAccounts || gettingBalances;

    function onPageChange(newPage: number) {
        setPage(newPage);
    }

    function onSizeChange(newSize: number) {
        setLimit(newSize);
    }

    function onSearch(newSearch: string) {
        setSearch(newSearch);
    }

    return {
        accounts: accounts?.data || [],
        balances: balanceData || [],
        isLoading,
        isRemoving,
        page,
        limit,
        total: accounts?.total || 0,
        remove,
        onPageChange,
        onSizeChange,
        onSearch,
    };
}
