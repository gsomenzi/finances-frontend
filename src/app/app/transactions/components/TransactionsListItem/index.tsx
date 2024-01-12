'use client';

import React, { useMemo, useState } from 'react';
import { TransactionsListItemProps } from './types';
import { Checkbox, List } from 'antd';
import { useTransaction } from '../../providers/TransactionProvider';

import { motion } from 'framer-motion';
import TransactionListItemDescription from '../TransactionListItemDescription';
import TransactionListItemContent from '../TransactionListItemContent';

const contextMenuVariants = {
    hidden: { opacity: 0, scale: 0, width: 0 },
    visible: { opacity: 1, scale: 1, width: 'auto' },
};

export default function TransactionsListItem(props: TransactionsListItemProps) {
    const [showContext, setShowContext] = useState(false);
    const { selectedTransactions, setSelectedTransaction, setSelectedTransactions } = useTransaction();
    const { item } = props;

    const [account, category, type] = useMemo(() => {
        const mainAccount = item?.relatedAccounts?.find((ra) =>
            ['income', 'expense', 'transfer_out'].includes(ra.relation),
        );
        return [mainAccount?.account || null, item.category || null, mainAccount?.relation || null];
    }, [item]);

    const installmentsNumber = useMemo(() => {
        const installmentsGroup = item?.transactionGroups.find((g) => g.type === 'installments');
        if (!installmentsGroup) return 1;
        return installmentsGroup.transactionsCount;
    }, [item]);

    const isGrouped = item.transactionGroups.some((g) => g.type === 'group');

    const group = useMemo(() => {
        const itemGroup = item?.transactionGroups.find((g) => g.type === 'group');
        if (!itemGroup) return null;
        console.log(itemGroup);
        return itemGroup;
    }, [item]);

    function handleItemSelection(e: any, checked: boolean) {
        e.preventDefault();
        e.stopPropagation();
        if (checked) {
            setSelectedTransactions([...selectedTransactions.filter((t) => t.id !== item.id), item]);
        } else {
            setSelectedTransactions(selectedTransactions.filter((t) => t.id !== item.id));
        }
    }

    return (
        <List.Item
            onMouseEnter={() => setShowContext(true)}
            onMouseLeave={() => setShowContext(false)}
            style={{ cursor: 'pointer' }}
            onClick={() =>
                setSelectedTransaction({
                    transaction: item,
                    action: 'details',
                })
            }>
            {!isGrouped && (
                <motion.div
                    layout
                    variants={contextMenuVariants}
                    initial="hidden"
                    animate={showContext || selectedTransactions.includes(item) ? 'visible' : 'hidden'}
                    exit="hidden">
                    <Checkbox
                        style={{ marginRight: '1rem' }}
                        onChange={(e) => handleItemSelection(e, e.target.checked)}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    />
                </motion.div>
            )}
            <List.Item.Meta
                style={{ position: 'relative' }}
                title={isGrouped ? group?.name : item.description}
                description={
                    <TransactionListItemDescription
                        account={account}
                        category={category}
                        isGrouped={isGrouped}
                        group={group}
                        installmentsNumber={installmentsNumber}
                    />
                }
            />
            <TransactionListItemContent
                isGrouped={isGrouped}
                group={group}
                showContext={showContext}
                transaction={item}
                type={type}
            />
        </List.Item>
    );
}
