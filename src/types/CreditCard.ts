export type CreditCard = {
    id: number;
    name: string;
    brand: string;
    closingDay: number;
    dueDay: number;
    limit: string;
    currency: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
};
