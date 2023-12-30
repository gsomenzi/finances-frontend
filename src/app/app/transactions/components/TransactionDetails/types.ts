import { Transaction } from '@/types/Transaction';

export type TransactionDetailsProps = {
    onEdit?: (transaction: Transaction) => void;
};
