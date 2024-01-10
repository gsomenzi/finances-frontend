import { Statement } from '@/types/Statement';

export type TransactionsListProps = {
    transactions: Statement['transactions'];
    loading: boolean;
};
