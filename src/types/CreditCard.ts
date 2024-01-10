export type CreditCard = {
    id: number;
    name: string;
    closingDay: number;
    dueDay: number;
    limit: string;
    currency: string;
    description: string | null;
};
