import { Tag } from './Tag';

export interface Transaction {
    id: number;
    description: string;
    value: string;
    date: string;
    paid: boolean;
    paid_at: string | null;
    notes: string | null;
    category: Category;
    relatedAccounts: RelatedAccount[];
    tags: Tag[];
    createdAt: string;
    updatedAt: string;
    images?: any[];
    transactionGroups?: TransactionGroup[];
}

interface Category {
    id: number;
    name: string;
    description?: any;
    destination?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface RelatedAccount {
    transactionToAccountId: number;
    transactionId: number;
    accountId: number;
    relation: string;
    account: Account;
}

interface Account {
    id: number;
    name: string;
    description?: string;
    type?: string;
    default?: boolean;
    currency?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface TransactionGroup {
    transactionToTransactionGroupId: number;
    transactionId: number;
    transactionGroupId: number;
    transactionGroup: TransactionGroup2;
}

interface TransactionGroup2 {
    id: number;
    type: string;
    notes: any;
    createdAt: string;
    updatedAt: string;
    transactions: RelatedTransaction[];
}

interface RelatedTransaction {
    transactionToTransactionGroupId: number;
    transactionId: number;
    transactionGroupId: number;
    transaction: RelatedTransaction2;
}

interface RelatedTransaction2 {
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
