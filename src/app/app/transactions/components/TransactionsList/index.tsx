'use client';

import React from 'react';
import { Wrapper } from './styles';
import { TransactionsListProps } from './types';
import { List } from 'antd';
import TransactionsListItem from '../TransactionsListItem';

export default function TransactionsList(props: TransactionsListProps) {
    const { transactions, loading } = props;
    return (
        <Wrapper>
            <List
                loading={loading}
                dataSource={transactions}
                renderItem={(item) => <TransactionsListItem item={item} />}
            />
        </Wrapper>
    );
}
