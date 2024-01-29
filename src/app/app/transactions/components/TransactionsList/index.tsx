'use client';

import React from 'react';
import { TransactionsListProps } from './types';
import { List } from 'antd';
import TransactionsListItem from './TransactionListItem';
import TransactionDetailsProvider from './TransactionListItem/providers/TransactionDetailsProvider';

export default function TransactionsList(props: TransactionsListProps) {
    const { transactions, loading } = props;
    return (
        <List
            loading={loading}
            dataSource={transactions}
            renderItem={(item) => (
                <TransactionDetailsProvider transaction={item}>
                    <TransactionsListItem />
                </TransactionDetailsProvider>
            )}
        />
    );
}
