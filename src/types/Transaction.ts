import { Tag } from './Tag';

export interface Transaction {
    id: number;
    description: string;
    value: string;
    date: string;
    paid: boolean;
    paid_at: any;
    notes: any;
    createdAt: string;
    updatedAt: string;
    images?: any[];
    category: Category;
    relatedAccounts: AccountRelation[];
    transactionGroups?: TransactionGroupRelation[];
    tags?: Tag[];
}

interface Category {
    id: number;
    name: string;
    description: any;
    destination: string;
    createdAt: string;
    updatedAt: string;
}

interface AccountRelation {
    relation: string;
    account: Account;
}

interface Account {
    id: number;
    name: string;
    description: string;
    type: string;
    default: boolean;
    currency: string;
    createdAt: string;
    updatedAt: string;
}

interface TransactionGroupRelation {
    transactionGroup: TransactionGroup;
}

interface TransactionGroup {
    id: number;
    type: string;
    transactionsCount: number;
    notes: any;
    createdAt: string;
    updatedAt: string;
    transactions: TransactionRelation[];
}

interface TransactionRelation {
    transaction: NestedTransaction;
}

interface NestedTransaction {
    id: number;
    description: string;
    value: string;
    date: string;
    paid: boolean;
    paid_at: any;
    notes: any;
    createdAt: string;
    updatedAt: string;
}
