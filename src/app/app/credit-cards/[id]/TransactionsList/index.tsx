'use client';

import React from 'react';
import { Wrapper } from './styles';
import { TransactionsListProps } from './types';
import { Empty, Flex, List, Spin } from 'antd';
import TransactionsListItem from '../TransactionsListItem';

export default function TransactionsList(props: TransactionsListProps) {
    const { transactions, loading } = props;
    return (
        <Wrapper>
            {transactions && transactions.length > 0 ? (
                <List
                    loading={loading}
                    dataSource={transactions}
                    renderItem={(item) => <TransactionsListItem item={item} />}
                />
            ) : (
                <Empty />
            )}
            {loading ? (
                <Flex align="center" justify="center">
                    <Spin />
                </Flex>
            ) : null}
        </Wrapper>
    );
}
