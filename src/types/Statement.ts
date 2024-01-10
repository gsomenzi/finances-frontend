import { CreditCard } from './CreditCard';
import { CreditCardTransaction } from './CreditCardTransaction';

export type Statement = {
    id: number;
    state: string;
    value: string;
    closingDate: string;
    dueDate: string;
    creditCard: CreditCard;
    transactions: CreditCardTransaction[];
};
