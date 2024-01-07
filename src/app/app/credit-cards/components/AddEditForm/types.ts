import { CreditCard } from '@/types/CreditCard';

export type AddEditFormProps = {
    creditCard?: CreditCard | null;
    open: boolean;
    onClose: () => void;
};
