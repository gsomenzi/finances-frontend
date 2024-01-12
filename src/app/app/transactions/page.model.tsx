import React, { ReactNode, useMemo } from 'react';
import { TransactionsViewProps } from './types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ListResponseData } from '@/types/ListResponseData';
import { Transaction } from '@/types/Transaction';
import { Tooltip } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import TransactionModel from '@/models/TransactionModel';
import { useTransaction } from './providers/TransactionProvider';
import AnalyticModel from '@/models/AnalyticModel';
import TransactionGroupModel from '@/models/TransactionGroupModel';
import { useFeedback } from '@/providers/FeedbackProvider';

export default function TransactionsViewModel(): TransactionsViewProps {
    const analyticModel = new AnalyticModel();
    const transactionModel = new TransactionModel();
    const transactionGroupModel = new TransactionGroupModel();
    const { account, category, dateFilter, limit, page, search, selectedTransactions, setSelectedTransactions } =
        useTransaction();
    const { showMessage, showNotification } = useFeedback();
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

    const isLoading = gettingTransactions;

    const { mutate: groupTransactions, isLoading: isGrouping } = useMutation(
        (transactionData: any) => {
            return transactionGroupModel.create(transactionData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('transactions');
                showMessage('success', 'Transação criada com sucesso!');
            },
            onError: (e: any) => {
                showNotification('Erro', e?.response?.data?.message || 'Erro ao criar transação', {
                    type: 'error',
                });
            },
            onSettled: () => {
                setSelectedTransactions([]);
            },
        },
    );

    const { mutate: remove, isLoading: isRemoving } = useMutation((id: number) => transactionModel.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
            queryClient.invalidateQueries('balances');
            showMessage('success', 'Transação removida com sucesso!');
        },
        onError: (e: any) => {
            showNotification('Erro', e?.response?.data?.message || 'Erro ao remover a transação', {
                type: 'error',
            });
        },
    });

    const { data: generalBalanceOnStartDate } = useQuery(
        ['balances', { date: dateFilter.startDate }],
        () => {
            return analyticModel.getGeneralBalanceProjection(dateFilter.startDate);
        },
        {
            enabled: !!dateFilter.startDate,
            select: (data): number => {
                return data.balance;
            },
        },
    );

    const { data: generalBalanceOnEndDate } = useQuery(
        ['balances', { date: dateFilter.endDate }],
        () => {
            return analyticModel.getGeneralBalanceProjection(dateFilter.endDate);
        },
        {
            enabled: !!dateFilter.endDate,
            select: (data): number => {
                return data.balance;
            },
        },
    );

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

    const filteredTransactions: Transaction[] = useMemo(() => {
        let tmpTransactions: Transaction[] = [];
        if (!transactions || !transactions.data) {
            return [];
        }
        tmpTransactions = [
            ...transactions.data.filter((t) => !t.transactionGroups || t.transactionGroups.length === 0),
        ];
        for (const t of transactions.data) {
            if (t.transactionGroups && t.transactionGroups.length > 0) {
                if (
                    !tmpTransactions
                        .flatMap((t) => t.transactionGroups)
                        .some((g) => t.transactionGroups.some((tg) => tg.id === g.id))
                ) {
                    tmpTransactions.push(t);
                }
            }
        }
        return tmpTransactions;
    }, [transactions]);

    const [transactionDates, generalIncomeOnPeriod, generalExpenseOnPeriod] = useMemo(() => {
        if (!transactions?.data) {
            return [[], 0, 0];
        }
        const dates = [...new Set(filteredTransactions.map((t) => t.date))];
        const totalIncome = transactions.data.reduce((acc, cur) => {
            const mainAccount = cur.relatedAccounts.find((a) => ['income', 'expense'].includes(a.relation));
            if (mainAccount?.relation === 'income') {
                return acc + Number(cur.value);
            }
            return acc;
        }, 0);
        const totalExpense = transactions.data.reduce((acc, cur) => {
            const mainAccount = cur.relatedAccounts.find((a) => ['income', 'expense'].includes(a.relation));
            if (mainAccount?.relation === 'expense') {
                return acc + Number(cur.value);
            }
            return acc;
        }, 0);
        return [dates, totalIncome, totalExpense];
    }, [filteredTransactions, transactions]);

    function handleGroupTransactions() {
        if (selectedTransactions.length <= 1) {
            return;
        }
        groupTransactions({
            name: `${selectedTransactions[0].description} + ${selectedTransactions.length - 1} transações`,
            transactionIds: selectedTransactions.map((t) => t.id),
        });
    }

    return {
        transactions: filteredTransactions,
        isGrouping,
        isLoading,
        isRemoving,
        page,
        limit,
        total: transactions?.total || 0,
        transactionDates,
        account,
        category,
        generalBalanceOnStartDate,
        generalBalanceOnEndDate,
        generalIncomeOnPeriod,
        generalExpenseOnPeriod,
        remove,
        handleGroupTransactions,
        getTransactionTypeIcon,
    };
}
