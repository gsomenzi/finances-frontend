import { Account } from './Account';
import { Category } from './Category';
import { Tag } from './Tag';
import { TransactionGroup } from './TransactionGroup';

export type Transaction = {
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
};

interface AccountRelation {
    relation: string;
    account: Pick<Account, 'id' | 'name' | 'description' | 'type' | 'default' | 'currency'>;
}
