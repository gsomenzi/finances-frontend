export interface CreditCardTransaction {
    id: number;
    description: string;
    value: string;
    date: string;
    type: string;
    notes: any;
    group: Group;
}

interface Group {
    id: number;
    type: string;
    notes: any;
    createdAt: string;
    updatedAt: string;
    transactions: NestedTransaction[];
}

interface NestedTransaction {
    id: number;
    description: string;
    value: string;
    date: string;
    type: string;
    notes: any;
}
