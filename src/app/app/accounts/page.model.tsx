import React, { useEffect } from 'react';
import { AccountsViewProps } from './types';
import { useQuery } from 'react-query';
import { useAccount } from '@/hooks/useAccount';

export default function AccountsViewModel(): AccountsViewProps {
    const { getAccounts, getAccountsBalances } = useAccount();

    const { data: accountsData, isLoading: gettingAccounts } = useQuery('accounts', getAccounts, {
        refetchOnWindowFocus: false,
    });

    const accounts = accountsData?.data || [];

    const { data: balanceData, isLoading: gettingBalances } = useQuery(
        ['balances', { accountIds: accounts.map((a: any) => a.id).join(',') }],
        getAccountsBalances,
        {
            enabled: accounts && accounts.length > 0,
            refetchOnWindowFocus: false,
        },
    );

    const balances = balanceData || [];

    const isLoading = gettingAccounts || gettingBalances;

    function getTranslatedType(type: string): string {
        switch (type) {
            case 'checkings':
                return 'Conta Corrente';
            case 'investment':
                return 'Conta de Investimentos';
            case 'other':
                return 'Outros';
            default:
                return 'Conta';
        }
    }

    return {
        accounts,
        balances,
        isLoading,
        getTranslatedType,
    };
}
