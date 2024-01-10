import { CreditCard } from './CreditCard';

export type Statement = {
    id: number;
    state: string;
    value: string;
    dueDate: string;
    creditCard: CreditCard;
    transactions: CardTransaction[];
};

type CardTransaction = {
    id: number;
    description: string;
    value: string;
    date: string;
    type: string;
    notes: any;
    group: Group;
};

type Group = {
    id: number;
    type: string;
    notes: any;
    createdAt: string;
    updatedAt: string;
    transactions: GroupedTransaction[];
};

type GroupedTransaction = {
    id: number;
    description: string;
    value: string;
    date: string;
    type: string;
    notes: any;
};
