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
    remove: UseMutateFunction<any, unknown, number, unknown>;
    onPageChange: (newPage: number) => void;
    onSizeChange: (newSize: number) => void;
    onSearch: (newSearch: string) => void;
    onDateFilterChange: (newDateFilter: DateFilter) => void;
    getTransactionTypeIcon: (type: string) => React.ReactNode;
};

export type DateFilter = {
    startDate: string;
    endDate: string;
};
