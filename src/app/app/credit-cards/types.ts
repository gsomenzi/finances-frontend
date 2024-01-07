import { CreditCard } from '@/types/CreditCard';
import { UseMutateFunction } from 'react-query';

export type CreditCardsViewProps = {
    creditCards: CreditCard[];
    isLoading: boolean;
    isRemoving: boolean;
    page: number;
    limit: number;
    total: number;
    remove: UseMutateFunction<any, unknown, number, unknown>;
    onPageChange: (newPage: number) => void;
    onSizeChange: (newSize: number) => void;
    onSearch: (newSearch: string) => void;
};
