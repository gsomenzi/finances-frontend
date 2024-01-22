'use client';

import React, { useState } from 'react';
import { TransactionsListItemProps } from './types';
import { Checkbox, List, Typography } from 'antd';
import { useTransaction } from '../../providers/TransactionProvider';

import { motion } from 'framer-motion';
import TransactionListItemDescription from './components/TransactionListItemDescription';
import TransactionListItemContent from './components/TransactionListItemContent';
import { useTransactionDetails } from './providers/TransactionDetailsProvider';

const contextMenuVariants = {
    hidden: { opacity: 0, scale: 0, width: 0 },
    visible: { opacity: 1, scale: 1, width: 'auto' },
};

export default function TransactionsListItem(props: TransactionsListItemProps) {
    const [showGroupItems, setShowGroupItems] = useState(false);
    const { selectedTransactions, setSelectedTransaction, setSelectedTransactions } = useTransaction();
    const { transaction, showContext, setShowContext } = useTransactionDetails();

    function handleItemSelection(e: any, checked: boolean) {
        e.preventDefault();
        e.stopPropagation();
        if (checked) {
            setSelectedTransactions([...selectedTransactions.filter((t) => t.id !== transaction.id), transaction]);
        } else {
            setSelectedTransactions(selectedTransactions.filter((t) => t.id !== transaction.id));
        }
    }

    function handleShowGroupItems(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setShowGroupItems(!showGroupItems);
    }

    return (
        <>
            <List.Item
                onMouseEnter={() => setShowContext(true)}
                onMouseLeave={() => setShowContext(false)}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                    setSelectedTransaction({
                        transaction: transaction,
                        action: 'details',
                    })
                }>
                <motion.div
                    layout
                    variants={contextMenuVariants}
                    initial="hidden"
                    animate={showContext || selectedTransactions.includes(transaction) ? 'visible' : 'hidden'}
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
                <List.Item.Meta
                    style={{ position: 'relative' }}
                    title={transaction.description}
                    description={<TransactionListItemDescription handleShowGroupItems={handleShowGroupItems} />}
                />
                <TransactionListItemContent />
            </List.Item>
        </>
    );
}
