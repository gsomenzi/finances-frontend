import { Account } from '@/types/Account';

export type AddEditFormProps = {
    account?: Account | null;
    open: boolean;
    onClose: () => void;
};
