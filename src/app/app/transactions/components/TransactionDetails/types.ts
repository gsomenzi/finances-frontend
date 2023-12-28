import { Transaction } from '@/types/Transaction';

export type TransactionDetailsProps = {
    transaction: Transaction | null;
    open: boolean;
    onClose: () => void;
};
