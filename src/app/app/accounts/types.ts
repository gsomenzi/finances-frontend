export type AccountsViewProps = {
    accounts: any[];
    balances: any[];
    isLoading: boolean;
    getTranslatedType: (type: string) => string;
};
