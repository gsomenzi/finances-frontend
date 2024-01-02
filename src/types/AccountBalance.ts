export type AccountBalance = {
    accountId: number;
    accountName: string;
    projected: boolean;
    projectionDate: string | null;
    currency: string;
    balance: number;
};
