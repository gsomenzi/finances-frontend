import { Transaction } from './Transaction';

export type TransactionGroup = {
    id: number;
    name: string;
    type: string;
    transactionsCount: number;
    notes: any;
    transactions: Pick<Transaction, 'id' | 'description' | 'value' | 'date' | 'paid' | 'notes'>[];
};
