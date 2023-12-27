import { Transaction } from '@/types/Transaction';

export type TransactionsListProps = {
    transactions: Transaction[];
    loading: boolean;
    onSelect: (transaction: Transaction) => void;
};
