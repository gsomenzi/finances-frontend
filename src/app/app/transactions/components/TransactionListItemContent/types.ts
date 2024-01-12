import { Transaction } from '@/types/Transaction';
import { TransactionGroup } from '@/types/TransactionGroup';

export type TransactionListItemContentProps = {
    isGrouped: boolean;
    group: TransactionGroup | null;
    showContext: boolean;
    transaction: Transaction;
    type: string | null;
};
