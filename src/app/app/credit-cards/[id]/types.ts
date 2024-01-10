import { CreditCard } from '@/types/CreditCard';
import { Statement } from '@/types/Statement';

export type CreditCardDetailsViewProps = {
    creditCard: CreditCard | null;
    statement: Statement | null;
    transactions: Statement['transactions'];
    gettingCreditCard: boolean;
    gettingStatements: boolean;
    goPreviousDate: () => void;
    goNextDate: () => void;
    setSearch: (search: string) => void;
};
