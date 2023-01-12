export type Account = {
    id: number;
    description: string;
    type: string;
    opening_balance: string;
    current_balance: string;
    expected_balance: string;
    currency: string;
    default: number;
    created_at: Date;
    updated_at: Date;
    converted_balance: string;
    converted_expected_balance: string;
    exchange_rate_updated_at?: string | null;
    translated_type: string;
}