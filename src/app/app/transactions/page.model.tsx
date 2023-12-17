import React, { ReactNode, useEffect, useState } from 'react';
import { DateFilter, TransactionsViewProps } from './types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useTransaction } from '@/hooks/useTransaction';
import { ListResponseData } from '@/types/ListResponseData';
import { Transaction } from '@/types/Transaction';
import dayjs from 'dayjs';
import { Tooltip } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

export default function TransactionsViewModel(): TransactionsViewProps {
    const { getTransactions, removeTransaction } = useTransaction();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [search, setSearch] = useState('');
    const [dateFilter, setDateFilter] = useState<DateFilter>({
        startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
    });

    const { data: transactions, isLoading: gettingTransactions } = useQuery<ListResponseData<Transaction>>(
        ['transactions', { page, limit, search, startDate: dateFilter.startDate, endDate: dateFilter.endDate }],
        () => getTransactions({ page, limit, search, startDate: dateFilter.startDate, endDate: dateFilter.endDate }),
        {
            refetchOnWindowFocus: false,
        },
    );

    const { mutate: remove, isLoading: isRemoving } = useMutation((id: number) => removeTransaction(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
        },
    });

    const isLoading = gettingTransactions;

    function onPageChange(newPage: number) {
        setPage(newPage);
    }

    function onSizeChange(newSize: number) {
        setLimit(newSize);
    }

    function onSearch(newSearch: string) {
        setSearch(newSearch);
    }

    function onDateFilterChange(newDateFilter: DateFilter) {
        setDateFilter(newDateFilter);
    }

    function getTransactionTypeIcon(type: string): ReactNode {
        switch (type) {
            case 'income':
                return (
                    <Tooltip title="Receita">
                        <ArrowUpOutlined style={{ color: 'green' }} />
                    </Tooltip>
                );
            case 'expense':
                return (
                    <Tooltip title="Despesa">
                        <ArrowDownOutlined style={{ color: 'red' }} />
                    </Tooltip>
                );
            default:
                return null;
        }
    }

    return {
        transactions: transactions?.data || [],
        isLoading,
        isRemoving,
        page,
        limit,
        total: transactions?.total || 0,
        remove,
        onPageChange,
        onSizeChange,
        onSearch,
        onDateFilterChange,
        getTransactionTypeIcon,
    };
}
