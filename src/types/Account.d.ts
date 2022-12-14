export interface Account {
    id: number;
    description: string;
    type: string;
    opening_balance: string | number;
    currency: string;
    created_at: Date;
    updated_at: Date;
    current_balance: number;
    expected_balance: number;
    converted_balance: number;
    converted_expected_balance: number;
    default: boolean;
}