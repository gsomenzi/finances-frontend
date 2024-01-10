import { CreditCard } from './CreditCard';
import { CreditCardTransaction } from './CreditCardTransaction';

export type Statement = {
    id: number;
    state: string;
    value: string;
    dueDate: string;
    creditCard: CreditCard;
    transactions: CreditCardTransaction[];
};
