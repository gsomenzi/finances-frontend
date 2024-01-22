'use client';

import React from 'react';
import { Wrapper } from './styles';
import { TransactionsListProps } from './types';
import { List } from 'antd';
import TransactionsListItem from '../TransactionsListItem';
import TransactionDetailsProvider from '../TransactionsListItem/providers/TransactionDetailsProvider';

export default function TransactionsList(props: TransactionsListProps) {
    const { transactions, loading } = props;
    return (
        <Wrapper>
            <List
                header="Lançamentos"
                loading={loading}
                dataSource={transactions}
                renderItem={(item) => (
                    <TransactionDetailsProvider transaction={item}>
                        <TransactionsListItem />
                    </TransactionDetailsProvider>
                )}
            />
        </Wrapper>
    );
}
