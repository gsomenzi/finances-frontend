'use client';

import React from 'react';
import { Checkbox, Flex, List, Space, Typography } from 'antd';
import { useTransaction } from '../../../providers/TransactionProvider';

import TransactionMetadata from './components/TransactionMetadata';
import TransactionActions from './components/TransactionActions';
import { useTransactionDetails } from './providers/TransactionDetailsProvider';
import TransactionTagsPanel from './components/TransactionTagsPanel';

export default function TransactionsListItem() {
    const { setSelectedTransaction } = useTransaction();
    const { transaction, setShowContext } = useTransactionDetails();

    return (
        <>
            <List.Item
                onMouseEnter={() => setShowContext(true)}
                onMouseLeave={() => setShowContext(false)}
                style={{ cursor: 'pointer', position: 'relative' }}
                onClick={() =>
                    setSelectedTransaction({
                        transaction: transaction,
                        action: 'details',
                    })
                }>
                <Space direction="vertical">
                    <Typography.Title style={{ marginTop: 0, marginBottom: 0 }} level={5}>
                        {transaction.description}
                    </Typography.Title>
                    <div>
                        <TransactionMetadata />
                    </div>
                </Space>
                <TransactionActions />
            </List.Item>
        </>
    );
}
