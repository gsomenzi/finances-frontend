import React, { ReactNode, useMemo } from 'react';
import { TransactionsViewProps } from './types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ListResponseData } from '@/types/ListResponseData';
import { Transaction } from '@/types/Transaction';
import { Tooltip } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import TransactionModel from '@/models/TransactionModel';
import { useTransaction } from './providers/TransactionProvider';

export default function TransactionsViewModel(): TransactionsViewProps {
    const transactionModel = new TransactionModel();
    const { account, category, dateFilter, limit, page, search } = useTransaction();
    const queryClient = useQueryClient();

    const { data: transactions, isLoading: gettingTransactions } = useQuery<ListResponseData<Transaction>>(
        [
            'transactions',
            {
                page,
                limit,
                search,
                accountId: account?.id || null,
                categoryId: category?.id || null,
                startDate: dateFilter.startDate,
                endDate: dateFilter.endDate,
            },
        ],
        () =>
            transactionModel.findMany({
                page,
                limit,
                search,
                accountId: account?.id || null,
                categoryId: category?.id || null,
                startDate: dateFilter.startDate,
                endDate: dateFilter.endDate,
            }),
        {
            refetchOnWindowFocus: false,
        },
    );

    const { mutate: remove, isLoading: isRemoving } = useMutation((id: number) => transactionModel.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
        },
    });

    const transactionDates = useMemo(() => {
        if (!transactions?.data) {
            return [];
        }
        return [...new Set(transactions.data.map((t) => t.date))];
    }, [transactions]);

    const isLoading = gettingTransactions;

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
        transactionDates,
        account,
        category,
        remove,
        getTransactionTypeIcon,
    };
}
