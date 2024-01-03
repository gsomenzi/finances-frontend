import { Account } from './Account';
import { Category } from './Category';
import { Tag } from './Tag';

export interface Transaction {
    id: number;
    description: string;
    value: string;
    date: string;
    paid: boolean;
    paid_at: string | null;
    notes: string | null;
    images: any[];
    category: Pick<Category, 'id' | 'name' | 'description' | 'destination'>;
    relatedAccounts: AccountRelation[];
    transactionGroups: TransactionGroup[];
    tags: Pick<Tag, 'id' | 'name'>[];
}

interface AccountRelation {
    relation: string;
    account: Pick<Account, 'id' | 'name' | 'description' | 'type' | 'default' | 'currency'>;
}

interface TransactionGroup {
    id: number;
    type: string;
    transactionsCount: number;
    notes: string | null;
    transactions?: Pick<Transaction, 'id' | 'description' | 'value' | 'date' | 'paid' | 'paid_at' | 'notes'>[];
}
