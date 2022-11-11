export interface Account {
    id: number;
    description: string;
    type: string;
    opening_balance: string;
    currency: string;
    created_at: Date;
    updated_at: Date;
    current_balance: number;
}