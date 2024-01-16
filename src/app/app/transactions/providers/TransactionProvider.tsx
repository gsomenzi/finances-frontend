import { Account } from '@/types/Account';
import { Category } from '@/types/Category';
import dayjs from 'dayjs';
import React, { createContext, ReactNode, useState } from 'react';
import { DateFilter } from '../types';
import { Transaction } from '@/types/Transaction';

type TransactionSelection = {
    transaction: Transaction | null;
    action: 'add' | 'edit' | 'details' | null;
};

const ContextProps: {
    account: Pick<Account, 'id' | 'name'> | null;
    category: Pick<Category, 'id' | 'name'> | null;
    dateFilter: DateFilter;
    limit: number;
    page: number;
    search: string;
    selectedTransaction: TransactionSelection;
    selectedTransactions: Transaction[];
    selectedForGroup: Transaction[];
    setAccount: (value: Pick<Account, 'id' | 'name'> | null) => void;
    setCategory: (value: Pick<Category, 'id' | 'name'> | null) => void;
    setDateFilter: (value: DateFilter) => void;
    setLimit: (value: number) => void;
    setPage: (value: number) => void;
    setSearch: (value: string) => void;
    setSelectedTransaction: (value: TransactionSelection) => void;
    setSelectedTransactions: (value: Transaction[]) => void;
    setSelectedForGroup: (value: Transaction[]) => void;
} = {
    account: null,
    category: null,
    dateFilter: {
        startDate: '',
        endDate: '',
    },
    limit: 20,
    page: 1,
    search: '',
    selectedTransaction: {
        transaction: null,
        action: null,
    },
    selectedTransactions: [],
    selectedForGroup: [],
    setAccount: () => {},
    setCategory: () => {},
    setDateFilter: () => {},
    setLimit: () => {},
    setPage: () => {},
    setSearch: () => {},
    setSelectedTransaction: () => {},
    setSelectedTransactions: () => {},
    setSelectedForGroup: () => {},
};

const TransactionContext = createContext(ContextProps);

export const useTransaction = () => {
    return React.useContext(TransactionContext);
};

export default function TransactionProvider({ children }: { children: ReactNode }) {
    const [account, setAccount] = useState<Pick<Account, 'id' | 'name'> | null>(null);
    const [category, setCategory] = useState<Pick<Category, 'id' | 'name'> | null>(null);
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionSelection>({
        transaction: null,
        action: null,
    });
    const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>([]);
    const [selectedForGroup, setSelectedForGroup] = useState<Transaction[]>([]);
    const [dateFilter, setDateFilter] = useState<DateFilter>({
        startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
    });
    return (
        <TransactionContext.Provider
            value={{
                account,
                category,
                dateFilter,
                limit,
                page,
                search,
                selectedTransaction,
                selectedTransactions,
                selectedForGroup,
                setAccount,
                setCategory,
                setDateFilter,
                setLimit,
                setPage,
                setSearch,
                setSelectedTransaction,
                setSelectedTransactions,
                setSelectedForGroup,
            }}>
            {children}
        </TransactionContext.Provider>
    );
}
