import { CreditCardTransaction } from '@/types/CreditCardTransaction';
import { Statement } from '@/types/Statement';

export type AddEditFormProps = {
    statement: Statement;
    transaction: CreditCardTransaction | null;
    open: boolean;
    onClose: () => void;
};
