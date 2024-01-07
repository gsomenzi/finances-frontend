import { Account } from '@/types/Account';
import { UseMutateFunction } from 'react-query';

export type AccountsViewProps = {
    accounts: Account[];
    balances: {
        id: number;
        name: string;
        currency: string;
        balance: number;
    }[];
    isLoading: boolean;
    isRemoving: boolean;
    page: number;
    limit: number;
    total: number;
    remove: UseMutateFunction<any, unknown, number, unknown>;
    onPageChange: (newPage: number) => void;
    onSizeChange: (newSize: number) => void;
    onSearch: (newSearch: string) => void;
};
