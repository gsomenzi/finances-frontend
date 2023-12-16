import { Transaction } from '@/types/Transaction';

export type AddEditFormProps = {
    transaction?: Transaction | null;
    open: boolean;
    onClose: () => void;
};
