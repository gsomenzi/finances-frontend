import { Transaction } from './Transaction';

export interface TransactionGroup {
    id: number;
    name: string;
    type: string;
    transactionsCount: number;
    notes: string | null;
    transactions?: Pick<Transaction, 'id' | 'description' | 'value' | 'date' | 'paid' | 'paid_at' | 'notes'>[];
}
