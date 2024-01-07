import React, { ReactNode, useMemo } from 'react';
import { TransactionsViewProps } from './types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ListResponseData } from '@/types/ListResponseData';
import { Transaction } from '@/types/Transaction';
import { Tooltip } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import TransactionModel from '@/models/TransactionModel';
import { useTransaction } from './providers/TransactionProvider';
import AccountModel from '@/models/AccountModel';
import AnalyticModel from '@/models/AnalyticModel';

export default function TransactionsViewModel(): TransactionsViewProps {
    const accountModel = new AccountModel();
    const analyticModel = new AnalyticModel();
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

    const [transactionDates, generalIncomeOnPeriod, generalExpenseOnPeriod] = useMemo(() => {
        if (!transactions?.data) {
            return [[], 0, 0];
        }
        const dates = [...new Set(transactions.data.map((t) => t.date))];
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
    }, [transactions]);

    const isLoading = gettingTransactions;

    const { mutate: remove, isLoading: isRemoving } = useMutation((id: number) => transactionModel.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
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
        generalBalanceOnStartDate,
        generalBalanceOnEndDate,
        generalIncomeOnPeriod,
        generalExpenseOnPeriod,
        remove,
        getTransactionTypeIcon,
    };
}
