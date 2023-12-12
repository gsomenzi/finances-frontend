import React, { useEffect, useState } from 'react';
import { AccountsViewProps } from './types';
import { useQuery } from 'react-query';
import { useAccount } from '@/hooks/useAccount';

export default function AccountsViewModel(): AccountsViewProps {
    const { getAccounts, getAccountsBalances } = useAccount();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [search, setSearch] = useState('');

    const { data: accountsData, isLoading: gettingAccounts } = useQuery(
        ['accounts', { page, limit, search }],
        () => getAccounts({ page, limit, search }),
        {
            refetchOnWindowFocus: false,
        },
    );

    const accounts = accountsData?.data || [];
    const accountIds = accounts.map((a: any) => a.id);

    const { data: balanceData, isLoading: gettingBalances } = useQuery(
        ['balances', { accountIds }],
        () => getAccountsBalances(accountIds),
        {
            enabled: accounts && accounts.length > 0,
            refetchOnWindowFocus: false,
        },
    );

    const balances = balanceData || [];

    const isLoading = gettingAccounts || gettingBalances;

    return {
        accounts,
        balances,
        isLoading,
    };
}
