import { Account } from '@/types/Account';
import { Category } from '@/types/Category';
import { Transaction } from '@/types/Transaction';
import { TransactionGroup } from '@/types/TransactionGroup';
import { UseMutateFunction } from 'react-query';

export type TransactionsViewProps = {
    transactions: Transaction[];
    getting: boolean;
    isRemoving: boolean;
    total: number;
    transactionDates: string[];
    account: Pick<Account, 'id' | 'name'> | null;
    category: Pick<Category, 'id' | 'name'> | null;
    generalBalanceOnStartDate: number | undefined;
    generalBalanceOnEndDate: number | undefined;
    generalIncomeOnPeriod: number;
    generalExpenseOnPeriod: number;
    handleDateChange: (dateFilter: DateFilter) => void;
    remove: UseMutateFunction<any, unknown, number, unknown>;
    getTransactionTypeIcon: (type: string) => React.ReactNode;
};

export type DateFilter = {
    startDate: string;
    endDate: string;
};
