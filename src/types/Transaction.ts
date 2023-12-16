export type Transaction = {
    id: number;
    description: string;
    value: string;
    date: string;
    paid: boolean;
    paid_at: any;
    notes: any;
    category: Category;
    relatedAccounts: RelatedAccount[];
    tags: Tag[];
};

interface Category {
    id: number;
    name: string;
    destination: string;
}

interface RelatedAccount {
    relation: string;
    account: Account;
}

interface Account {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}
