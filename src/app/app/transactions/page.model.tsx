import React, { ReactNode, useEffect, useLayoutEffect, useMemo } from 'react';
import { DateFilter, TransactionsViewProps } from './types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ListResponseData } from '@/types/ListResponseData';
import { Transaction } from '@/types/Transaction';
import { Tooltip } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import TransactionModel from '@/models/TransactionModel';
import { useTransaction } from './providers/TransactionProvider';
import AnalyticModel from '@/models/AnalyticModel';
import { useFeedback } from '@/providers/FeedbackProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function TransactionsViewModel(): TransactionsViewProps {
    const analyticModel = new AnalyticModel();
    const transactionModel = new TransactionModel();
    const { account, category, dateFilter, page, search, setDateFilter } = useTransaction();
    const { showMessage, showNotification } = useFeedback();
    const queryClient = useQueryClient();
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const { data: transactions, isLoading: gettingTransactions } = useQuery<ListResponseData<Transaction>>(
        [
            'transactions',
            {
                search,
                accountId: account?.id || null,
                categoryId: category?.id || null,
                startDate: dateFilter.startDate,
                endDate: dateFilter.endDate,
            },
        ],
        () =>
            transactionModel.findMany({
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
        if (!transactions || !transactions.data) {
            return [];
        }
        return transactions.data;
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

    function handleDateChange(dateFilter: DateFilter) {
        setDateFilter(dateFilter);
        router.replace(pathName + '?' + new URLSearchParams({ ...dateFilter }).toString());
    }

    useLayoutEffect(() => {
        setDateFilter({
            startDate: searchParams.get('startDate') || dateFilter.startDate,
            endDate: searchParams.get('endDate') || dateFilter.endDate,
        });
    }, [searchParams]);

    return {
        transactions: filteredTransactions,
        isRemoving,
        getting: gettingTransactions,
        total: transactions?.total || 0,
        transactionDates,
        account,
        category,
        generalBalanceOnStartDate,
        generalBalanceOnEndDate,
        generalIncomeOnPeriod,
        generalExpenseOnPeriod,
        handleDateChange,
        remove,
        getTransactionTypeIcon,
    };
}
