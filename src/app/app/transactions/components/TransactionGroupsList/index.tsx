'use client';

import React from 'react';
import { Wrapper } from './styles';
import { TransactionGroupsListProps } from './types';
import { List } from 'antd';
import TransactionsListItem from '../TransactionsListItem';
import TransactionDetailsProvider from '../TransactionsListItem/providers/TransactionDetailsProvider';

export default function TransactionGroupsList(props: TransactionGroupsListProps) {
    const { groups, loading } = props;
    return (
        <Wrapper>
            <List
                header="Grupos de lançamentos"
                loading={loading}
                dataSource={groups}
                renderItem={(item) => {
                    return <span key={item.id}>{item.name}</span>;
                }}
            />
        </Wrapper>
    );
}
