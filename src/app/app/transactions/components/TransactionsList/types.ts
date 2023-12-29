import { Account } from '@/types/Account';
import { Category } from '@/types/Category';
import { Transaction } from '@/types/Transaction';

export type TransactionsListProps = {
    transactions: Transaction[];
    loading: boolean;
    onSelect: (transaction: Transaction) => void;
    onSelectAccount?: (account: Pick<Account, 'id' | 'name'>) => void;
    onSelectCategory?: (category: Pick<Category, 'id' | 'name'>) => void;
};
