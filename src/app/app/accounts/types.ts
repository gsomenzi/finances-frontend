import { Account } from '@/types/Account';
import { UseMutateFunction } from 'react-query';

export type AccountsViewProps = {
    accounts: Account[];
    balances: any[];
    isLoading: boolean;
    isRemoving: boolean;
    remove: UseMutateFunction<any, unknown, number, unknown>;
};
