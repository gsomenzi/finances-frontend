'use client';

import React, { useEffect } from 'react';
import { List } from 'antd';
import { useTransactionGroupDetails } from './providers/TransactionGroupDetailsProvider';
import TransactionGroupMetadata from './components/TransactionGroupMetadata';
import TransactionGroupActions from './components/TransactionGroupActions';

export default function TransactionGroupListItem() {
    const { transactionGroup, setShowContext } = useTransactionGroupDetails();

    return (
        <>
            <List.Item
                onMouseEnter={() => setShowContext(true)}
                onMouseLeave={() => setShowContext(false)}
                style={{ cursor: 'pointer' }}
                onClick={() => {}}>
                <List.Item.Meta
                    style={{ position: 'relative' }}
                    title={transactionGroup.name}
                    description={<TransactionGroupMetadata />}
                />
                <TransactionGroupActions />
            </List.Item>
        </>
    );
}
