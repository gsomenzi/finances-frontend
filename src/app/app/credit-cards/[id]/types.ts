import { CreditCard } from '@/types/CreditCard';
import { Statement } from '@/types/Statement';

export type CreditCardDetailsViewProps = {
    creditCard: CreditCard | null;
    statement: Statement | null;
    gettingCreditCard: boolean;
    gettingStatements: boolean;
};
