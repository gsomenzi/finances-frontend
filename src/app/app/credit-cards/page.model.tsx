import React, { useEffect, useState } from 'react';
import { CreditCardsViewProps } from './types';
import CreditCardModel from '@/models/CreditCardModel';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ListResponseData } from '@/types/ListResponseData';
import { CreditCard } from '@/types/CreditCard';

export default function CreditCardsViewModel(): CreditCardsViewProps {
    const creditCardModel = new CreditCardModel();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [search, setSearch] = useState('');

    const { data: creditCards, isLoading } = useQuery<ListResponseData<CreditCard>>(
        ['credit-cards', { page, limit, search }],
        () => creditCardModel.findMany({ page, limit, search }),
        {
            refetchOnWindowFocus: false,
        },
    );

    const { mutate: remove, isLoading: isRemoving } = useMutation((id: number) => creditCardModel.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('credit-cards');
        },
    });

    function onPageChange(newPage: number) {
        setPage(newPage);
    }

    function onSizeChange(newSize: number) {
        setLimit(newSize);
    }

    function onSearch(newSearch: string) {
        setSearch(newSearch);
    }

    return {
        creditCards: creditCards?.data || [],
        isLoading,
        isRemoving,
        page,
        limit,
        total: creditCards?.total || 0,
        remove,
        onPageChange,
        onSizeChange,
        onSearch,
    };
}
