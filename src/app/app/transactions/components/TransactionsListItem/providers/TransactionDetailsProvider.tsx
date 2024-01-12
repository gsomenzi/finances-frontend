import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { Transaction } from '@/types/Transaction';
import { Account } from '@/types/Account';
import { TransactionGroup } from '@/types/TransactionGroup';
import { Category } from '@/types/Category';
import { Tooltip } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const ContextProps: {
    account: Pick<Account, 'id' | 'name' | 'description' | 'default' | 'type' | 'currency'> | null;
    category: Pick<Category, 'id' | 'name'> | null;
    type: string | null;
    installmentsNumber: number;
    isGrouped: boolean;
    group: TransactionGroup | null;
    transaction: Transaction;
    transactionTypeIcon: React.ReactNode;
    showContext: boolean;
    setShowContext: (show: boolean) => void;
} = {
    account: null,
    category: null,
    type: null,
    installmentsNumber: 1,
    isGrouped: false,
    group: null,
    transaction: {} as Transaction,
    transactionTypeIcon: null,
    showContext: false,
    setShowContext: () => {},
};

const TransactionDetailsContext = createContext(ContextProps);

export const useTransactionDetails = () => {
    return React.useContext(TransactionDetailsContext);
};

export default function TransactionDetailsProvider({
    children,
    transaction,
}: {
    children: ReactNode;
    transaction: Transaction;
}) {
    const [showContext, setShowContext] = useState(false);

    const [account, category, type] = useMemo(() => {
        const mainAccount = transaction?.relatedAccounts?.find((ra) =>
            ['income', 'expense', 'transfer_out'].includes(ra.relation),
        );
        return [mainAccount?.account || null, transaction?.category || null, mainAccount?.relation || null];
    }, [transaction]);

    const installmentsNumber = useMemo(() => {
        const installmentsGroup = transaction?.transactionGroups.find((g) => g.type === 'installments');
        if (!installmentsGroup) return 1;
        return installmentsGroup.transactionsCount;
    }, [transaction]);

    const [isGrouped, group] = useMemo(() => {
        const itemGroup = transaction?.transactionGroups.find((g) => g.type === 'group');
        if (!itemGroup) return [false, null];
        return [true, itemGroup];
    }, [transaction]);

    const transactionTypeIcon = useMemo(() => {
        if (!type) {
            return null;
        }
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
    }, [type]);

    return (
        <TransactionDetailsContext.Provider
            value={{
                account,
                category,
                group,
                installmentsNumber,
                isGrouped,
                transaction,
                type,
                transactionTypeIcon,
                showContext,
                setShowContext,
            }}>
            {children}
        </TransactionDetailsContext.Provider>
    );
}
