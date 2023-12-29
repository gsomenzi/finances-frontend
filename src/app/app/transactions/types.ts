import { Account } from '@/types/Account';
import { Category } from '@/types/Category';
import { Transaction } from '@/types/Transaction';
import { UseMutateFunction } from 'react-query';

export type TransactionsViewProps = {
    transactions: Transaction[];
    isLoading: boolean;
    isRemoving: boolean;
    page: number;
    limit: number;
    total: number;
    transactionDates: string[];
    account: Pick<Account, 'id' | 'name'> | null;
    category: Pick<Category, 'id' | 'name'> | null;
    remove: UseMutateFunction<any, unknown, number, unknown>;
    onPageChange: (newPage: number) => void;
    onSizeChange: (newSize: number) => void;
    onSearch: (newSearch: string) => void;
    onAccountChange: (newAccount: Pick<Account, 'id' | 'name'> | null) => void;
    onCategoryChange: (newCategory: Pick<Category, 'id' | 'name'> | null) => void;
    onDateFilterChange: (newDateFilter: DateFilter) => void;
    getTransactionTypeIcon: (type: string) => React.ReactNode;
};

export type DateFilter = {
    startDate: string;
    endDate: string;
};
