export type Account = {
    id: number;
    name: string;
    description: any;
    type: string;
    default: boolean;
    currency: string;
    createdAt: string;
    relatedTransactions: RelatedTransaction[];
};

interface RelatedTransaction {
    transactionToAccountId: number;
    transaction: Transaction;
}

interface Transaction {
    id: number;
    description: string;
    value: string;
}
